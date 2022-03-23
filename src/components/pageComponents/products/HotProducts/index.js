import { useState, useEffect } from 'react';
import Nav from '../../../common/Nav';
import MainTab from '../../../common/MainTab';
import { API, PRODUCT_API } from '../../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import styles from './index.module.scss';
import HotGridLayout from './HotGridLayout';
import GridItemList from './GridItemList';

const HotProducts = ({ products }) => {
  // 데이터 9개씩 짤라줘야함 -> 그리드당 9개 데이터 사용
  const copyProducts = [...products];
  const dividedListByNine = [];

  const num =
    copyProducts.length % 9 === 0
      ? copyProducts.length / 9
      : Math.floor(copyProducts.length / 9) + 1;

  for (let i = 0; i < num; i++) {
    dividedListByNine[i] = copyProducts.splice(0, 9);
  }

  const [productsList, setProductsList] = useState(dividedListByNine);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) return;
    fetchGet(`${PRODUCT_API}/products?order=hot&pageSize=16&page=${page}`).then(
      (result) => {
        setProductsList((prev) => ({
          productsList: [...prev, result.resultList],
        }));
      }
    );
  }, [page]);

  const toggleProductLike = (targetId) => {
    const updatedProducts = productsList.map((products) =>
      products.map((product) =>
        targetId === product.id ? { ...product, like: !product.like } : product
      )
    );

    setProductsList(updatedProducts);

    const targetProductsGroupIndex = productsList.findIndex((products) =>
      products.find((product) => product.id === targetId)
    );

    const targetProductIndex = productsList[targetProductsGroupIndex].findIndex(
      (product) => product.id === targetId
    );

    // api 요청 주석처리
    // if (productsList[targetProductsGroupIndex][targetProductIndex].like) {
    //   fetchDelete(`${API}/users/like/product/${targetId}`)
    //     .then((res) => {
    //       if (res.status === 204) {
    //         alert('Like Cancle Success');
    //       } else {
    //         alert('Like Cancle Fail');
    //       }
    //     })
    //     .catch((error) => console.log(error.message));
    // } else {
    //   fetchPost(`${API}/users/like/product`, { product_id: targetId })
    //     .then((res) => {
    //       if (res.status === 201) {
    //         alert('Like Success');
    //       } else {
    //         alert('Like Fail');
    //       }
    //     })
    //     .catch((error) => console.log(error.message));
    // }
  };

  const addToCart = (targetId) => {
    const updatedProducts = productsList.map((products) =>
      products.map((product) =>
        targetId === product.id && product.cart === false
          ? { ...product, cart: !product.cart }
          : product
      )
    );

    setProductsList(updatedProducts);

    const targetProductsGroupIndex = productsList.findIndex((products) =>
      products.find((product) => product.id === targetId)
    );

    const targetProductIndex = productsList[targetProductsGroupIndex].findIndex(
      (product) => product.id === targetId
    );

    // api요청 주석 처리
    // if (!productsList[targetProductsGroupIndex][targetProductIndex].cart) {
    //   fetchPost(`${API}/orders/order-items`, {
    //     product_id: targetId,
    //     count: 1,
    //   })
    //     .then((res) => {
    //       if (res.status === 201) {
    //         alert('Add Cart Success');
    //       } else {
    //         alert('Add Cart Fail', res.message);
    //       }
    //     })
    //     .catch((error) => console.log(error.message));
    // }
  };

  return (
    <>
      <HotGridLayout>
        {productsList?.map((products, idx) => (
          <GridItemList
            key={idx}
            oddOrEven={(idx + 1) % 2 === 0 ? 'even' : 'odd'}
            items={products}
            addToCart={addToCart}
            toggleProductLike={toggleProductLike}
          />
        ))}
      </HotGridLayout>
    </>
  );
};

export default HotProducts;
