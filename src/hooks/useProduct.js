import { useState, useEffect } from 'react';

export const useProduct = (itemsList) => {
  // productsList : [ [{}, {}, ...], ...]
  const [productsList, setProductsList] = useState();

  useEffect(() => {
    setProductsList(itemsList);
  }, [itemsList]);

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

  return [productsList, toggleProductLike, addToCart];
};
