// src/mocks/handlers.js
import { rest } from 'msw';
import { API } from '../config';

const CHARACTER = ['강아지', '고양이', '햄스터', '토끼', '고슴도치', '앵무새'];
const CATEGORY = ['먹이', '토이', '스티커', '발바닥', '집'];
const mockProducts = (() =>
  Array.from({ length: 80 }).map((_, i) => ({
    id: i + 1,
    name: `${i + 1}`,
    character: CHARACTER[Math.floor(Math.random() * (5 + 1))],
    category: CATEGORY[Math.floor(Math.random() * (4 + 1))],
    price: i + 1,
    stock: Math.floor(Math.random() * 10) + i,
    like: false,
    cart: false,
    imgSrc: `https://picsum.photos/200/300?random=${i + 1}`,
    content:
      'https://raw.githubusercontent.com/jotasic/21-kaka0-pet-shop-images/main/product-content/1.jpg',
    imageUrls: [
      'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_1.jpeg',
      'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_2.jpeg',
      'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_3.jpeg',
    ],
    starPoint: (Math.random() * 5).toFixed(1),
    starPointCount: 1,
  })))();

let cartList = [];
let likeList = [];

export const handlers = [
  // login
  rest.post(`${API}/users/login`, (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      ctx.status(200),
      ctx.json({
        token: '123',
        user_name: 'eyes',
      })
    );
  }),
  // logout
  rest.post(`${API}/users/logout`, (req, res, ctx) => {
    sessionStorage.removeItem('is-authenticated', 'true');
    return res(ctx.status(200));
  }),
  // get /products || /products?key=name
  rest.get(`${API}/products`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const searchObj = {};

    if (searchParams.toString() !== '') {
      for (const [key, value] of searchParams) {
        searchObj[key] = value;
      }
    } else {
      // 전체 상품 데이터 요청 경우
      return res(
        ctx.status(200),
        ctx.json({
          resultList: mockProducts,
          page: 1,
          pageSize: mockProducts.length,
          totalCount: mockProducts.length,
          totalPageCount: 1,
          numberOfElements: mockProducts.length,
        })
      );
    }

    const modifiedProducts = mockProducts.map((product) => {
      // TODO: 필요없는 프로퍼티를 삭제하는 건데 products/:id 처리과정에서 여기 부분에 영향을 받아 해당 프로퍼티가 있야하는데 없다....??
      // delete product.content;
      // delete product.imageUrls;
      // delete product.starPoint;
      // delete product.starPointCount;
      return product;
    });

    const sortedProducts = modifiedProducts.sort((a, b) => {
      // 인기상품순 -> stock이 높은게 더 많이 팔린다 가정 -> 높은 숫자가 더 많이 팔렸다(인기있다)라고 이해하기
      if (searchObj?.order === 'hot') return b.stock - a.stock;

      // 기본 신상품순 -> id가 높은게 최신
      return b.id - a.id;
    });

    const filteredProducts = sortedProducts.filter((product) => {
      if (searchObj?.character && searchObj.character !== '전체') {
        return product.character === searchObj.character;
      }
      if (searchObj?.catagory && searchObj.catagory !== '전체') {
        return product.catagory === searchObj.catagory;
      }
      if (searchObj?.search) return product.name.includes(searchObj.search);

      return product;
    });

    let offset = 0;
    let pageSize = Number(searchObj?.pageSize) || 0;
    let page = Number(searchObj?.page) || 1;

    if (page && pageSize) {
      offset = (page - 1) * pageSize;
    }

    const pagedProducts = pageSize
      ? filteredProducts.slice(offset, offset + pageSize)
      : filteredProducts.slice(offset);

    let pagedProductsTotalPageCount = 1;

    if (pageSize !== 0) {
      pagedProductsTotalPageCount =
        pagedProducts.length % pageSize === 0
          ? Math.floor(filteredProducts.length / pageSize)
          : Math.floor(filteredProducts.length / pageSize) + 1;
    }

    if (page > pagedProductsTotalPageCount) {
      return res(cts.status(204));
    }
    return res(
      ctx.status(200),
      ctx.json({
        resultList: pagedProducts,
        page: page || 1,
        pageSize: pageSize || pagedProducts.length,
        totalCount: pagedProducts.length,
        totalPageCount: pagedProductsTotalPageCount,
        numberOfElements: pagedProducts.length,
      })
    );
  }),
  // get products/:id
  rest.get(`${API}/product/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const [productInfo] = mockProducts.filter(
      (product) => product.id === Number(productId)
    );
    return res(ctx.json({ result: productInfo }));
  }),
];

/*
- 장바구니 get post patch delete
- 좋아요 get, delete||patch
  좋아요/취소 같이 : users/like/product/숫자

page : 현재 페이지 번호
pageSize : 페이지 한개당 결과 갯수
totalCount : 전체 아이템 갯수
totalPageCount : 전체 페이지 갯수
numberOfElements : 결과 리스트의 길이
*/
