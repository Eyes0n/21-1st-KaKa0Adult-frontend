import { useState, useEffect } from 'react';

export const useProduct = (state) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(state);
  }, [state]);

  const toggleProductLike = (updatedId, updatedIndex) => {
    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    setProducts(updatedProducts);

    const isLikeProduct = products[updatedIndex].like;

    // const res = isLikeProduct
    //   ? fetchDelete(`${USER_API}/users/like/product/${updatedId}`)
    //   : fetchPost(`${USER_API}/users/like/product`, { product_id: updatedId });

    // res
    //   .then((res) => {
    //     if (res.status === 201) {
    //       return alert('Like Success');
    //     } else if (res.status === 204) {
    //       return alert('Like Cancle Success');
    //     } else throw new Error(res.message);
    //   })
    //   .catch((err) => console.error(err));
  };

  const addToCart = (updatedId, updatedIndex) => {
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    setProducts(updatedProducts);

    if (!products[updatedIndex].cart) {
      // fetchPost(`${CART_API}/orders/order-items`, {
      //   product_id: updatedId,
      //   count: 1,
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       alert('Add Cart Success');
      //     } else {
      //       alert('Add Cart Fail');
      //     }
      //   })
      //   .catch((error) => console.log(error.message));
    }
  };

  return [products, toggleProductLike, addToCart];
};
