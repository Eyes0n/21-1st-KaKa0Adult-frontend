import React, { Component } from 'react';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import GridCard from './GridCard';
import { API, PRODUCT_API } from '../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../utils/fetches';
import styles from './index.module.scss';

export default class HotProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      page: 1, // infinite scroll
    };
  }

  componentDidMount() {
    // fetchGet(`${PRODUCT_API}/products?order=hot&pageSize=16&page=1`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     this.setState({
    //       products: result.resultList,
    //     });
    //   });

    fetchGet('http://localhost:3000/data/hotProductsData.json')
      .then((res) => res.json())
      .then((result) => {
        this.setState((prev) => ({
          ...prev,
          products: result.resultList,
        }));
      });
  }

  toggleProductLike = (updatedId) => {
    const { products } = this.state;

    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    this.setState({
      products: updatedProducts,
    });

    // productId가 1부터 시작 해당 인텍스를 참조하기 위해 -1를 해줌
    if (products[updatedId - 1].like) {
      fetchDelete(`${API}/users/like/product/${updatedId}`)
        .then((res) => {
          if (res.status === 204) {
            alert('Like Cancle Success');
          } else {
            alert('Like Cancle Fail');
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      fetchPost(`${API}/users/like/product`, { product_id: updatedId })
        .then((res) => {
          if (res.status === 201) {
            alert('Like Success');
          } else {
            alert('Like Fail');
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  addToCart = (updatedId) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    this.setState({
      products: updatedProducts,
    });

    if (!products[updatedId - 1].cart) {
      fetchPost(`${API}/orders/order-items`, {
        product_id: updatedId,
        count: 1,
      })
        .then((res) => {
          if (res.status === 201) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail', res.message);
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <>
        <Nav />
        <MainTab />

        <div className={styles.hotGridWrap}>
          <div className={styles.hotGrid}>
            <div className={styles.sectionGrid1}>
              {products.slice(0, 3).map((product) => (
                <GridCard
                  key={product.id}
                  product={product}
                  addToCart={this.addToCart}
                  toggleProductLike={this.toggleProductLike}
                />
              ))}
            </div>
            <div className={styles.sectionGrid2}>
              {products.slice(3, 9).map((product) => (
                <GridCard
                  key={product.id}
                  product={product}
                  addToCart={this.addToCart}
                  toggleProductLike={this.toggleProductLike}
                />
              ))}
            </div>
            <div className={styles.sectionGrid3}>
              {products.slice(9, 12).map((product) => (
                <GridCard
                  key={product.id}
                  product={product}
                  addToCart={this.addToCart}
                  toggleProductLike={this.toggleProductLike}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
