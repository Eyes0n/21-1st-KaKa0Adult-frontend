import { rest } from 'msw';
import { API } from '../config';
import { mockData } from './mockpData';

// const CHARACTER = ['강아지', '고양이', '햄스터', '토끼', '고슴도치', '앵무새'];
// const CATEGORY = ['먹이', '토이', '스티커', '발바닥', '집'];
// const mockProducts = (() =>
//   Array.from({ length: 80 }).map((_, i) => ({
//     id: i + 1,
//     name: `${i + 1}`,
//     character: CHARACTER[Math.floor(Math.random() * (5 + 1))],
//     category: CATEGORY[Math.floor(Math.random() * (4 + 1))],
//     price: i + 1,
//     stock: Math.floor(Math.random() * 10) + i,
//     like: false,
//     cart: false,
//     imgSrc: `https://picsum.photos/200/300?random=${i + 1}`,
//     content:
//       'https://raw.githubusercontent.com/jotasic/21-kaka0-pet-shop-images/main/product-content/1.jpg',
//     imageUrls: [
//       'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_1.jpeg',
//       'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_2.jpeg',
//       'https://jotasic.github.io/21-kaka0-pet-shop-images/images/carousel_3.jpeg',
//     ],
//     starPoint: (Math.random() * 5).toFixed(1),
//     starPointCount: 1,
//   })))();
const mockProducts = [...mockData];
let cartList = {};
let likeList = [];
let orderList = [];

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
      // TODO 필요 없는 속성들을 지웠으나 상세 데이터 요청 시 상세 데이터가 누락되어 옴
      // 이유는 배열 원소인 객체가 참조형이라 영향을 받음 이걸 해결할려면 새로운 객체들로 구성된 새로운 배열이 필요
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
      pagedProductsTotalPageCount = Math.ceil(
        filteredProducts.length / pageSize
      );
    }

    if (page > pagedProductsTotalPageCount || pagedProducts.length === 0) {
      return res(ctx.status(204));
    }
    /*
      resultList : 결과 상품 배열
      page : 현재 페이지 번호
      pageSize : 페이지당 결과 갯수
      totalCount : 전체 아이템 갯수
      totalPageCount : 전체 페이지 갯수
      numberOfElements : 결과 리스트(결과 상품 배열)의 길이
    */

    return res(
      ctx.status(200),
      ctx.json({
        resultList: pagedProducts,
        page: page || 1,
        pageSize: pageSize || pagedProducts.length,
        totalCount: filteredProducts.length,
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
  // 좋아요 상품 get
  rest.get(`${API}/users/like/products`, (req, res, ctx) => {
    // likeList : [id,id,]
    const likedProducts = likeList.map((likeId) => {
      const found = mockProducts.filter((product) => product.id === likeId);
      return found[0];
    });
    return res(ctx.status(200), ctx.json(likedProducts));
  }),
  // 상품 좋아요 post users/like/product
  rest.post(`${API}/users/like/product`, (req, res, ctx) => {
    const { product_id } = req.body;
    const targetId = Number(product_id);
    const exist = likeList.includes(targetId);
    const targetIndex = mockProducts.findIndex(
      (product) => product.id === targetId
    );

    if (!exist) {
      likeList.push(targetId);
      mockProducts[targetIndex].like = true;
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: targetId,
        p: mockProducts[targetIndex],
      })
    );
  }),
  // 상품 좋아요 취소 delete users/like/product
  rest.delete(`${API}/users/like/product/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const targetId = Number(id);
    const exist = likeList.includes(targetId);
    const targetIndex = mockProducts.findIndex(
      (product) => product.id === targetId
    );

    if (exist) {
      likeList = likeList.filter((likeId) => likeId !== targetId);
      mockProducts[targetIndex].like = false;
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: targetId,
      })
    );
  }),
  // 장바구니 get orders/order-items
  rest.get(`${API}/orders/order-items`, (req, res, ctx) => {
    const cartData = [];
    for (const productId in cartList) {
      const targetId = Number(productId);
      const targetIndex = mockProducts.findIndex(
        (product) => product.id === targetId
      );
      const product = { ...mockProducts[targetIndex] };
      product.count = cartList[productId];
      product.selected = true;
      cartData.push(product);
    }

    if (cartData.length === 0) return res(ctx.status(204));

    return res(
      ctx.status(200),
      ctx.json({
        items_in_cart: cartData,
      })
    );
  }),
  // 장바구니 추가 post orders/order-items
  rest.post(`${API}/orders/order-items`, (req, res, ctx) => {
    const { product_id, count } = req.body;
    const targetIndex = mockProducts.findIndex(
      (product) => product.id === product_id
    );
    cartList[product_id] = count;
    mockProducts[targetIndex].cart = true;

    return res(
      ctx.status(201),
      ctx.json({
        id: product_id,
        count,
      })
    );
  }),
  // 장바구니 삭제 delete orders/order-items
  rest.delete(`${API}/orders/order-items/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const targetId = Number(productId);
    const targetIndex = mockProducts.findIndex(
      (product) => product.id === targetId
    );

    delete cartList[targetId];
    mockProducts[targetIndex].cart = false;

    return res(
      ctx.status(200),
      ctx.json({
        id: targetId,
      })
    );
  }),
  // 장바구니 상품 수량 수정 patch orders/order-items
  rest.patch(`${API}/orders/order-items`, (req, res, ctx) => {
    const { order_item_id, count } = req.body;

    cartList[order_item_id] = count;

    return res(
      ctx.status(200),
      ctx.json({
        id: order_item_id,
        count: cartList[order_item_id],
      })
    );
  }),
  // 결제 요청 post orders
  rest.post(`${API}/orders`, (req, res, ctx) => {
    const { order_item_list, recipient_info } = req.body;

    order_item_list.forEach((item) => delete cartList[item.id]);

    const orderHistory = {
      orderId: new Date().toISOString(),
      products: order_item_list, // [{},{}]
      recipient_info: recipient_info, // {}
      createdAt: new Date(), // string
      deliveryState: '주문 접수',
    };
    orderList.push(orderHistory);

    return res(ctx.status(204));
  }),
  // 주문 내역 get orders
  rest.get(`${API}/orders`, (req, res, ctx) => {
    if (!orderList.length) {
      return res(ctx.status(204));
    }

    return res(ctx.status(200), ctx.json(orderList));
  }),
];
