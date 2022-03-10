import React, { Component } from 'react';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import GridCard from './GridCard';
import { API, PRODUCT_API } from '../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../utils/fetches';
import { hotData } from './hotData';
import './index.scss';

export default class HotProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      currentId: '',
    };
  }

  componentDidMount() {
    fetchGet(`${PRODUCT_API}/products?order=hot&pageSize=16&page=1`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          products: result.resultList,
        });
      });
    // this.setState({
    //   products: hotData.resultList,
    // });
  }

  bringMenuId = (id) => {
    this.setState({ currentId: id });
  };

  toggleProductLike = (updatedId) => {
    const { products } = this.state;

    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    this.setState({
      products: updatedProducts,
    });

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
        <MainTab checkMenuId={this.bringMenuId} />

        <div className="hotGridWrap">
          <div className="hotGrid">
            <div className="sectionGrid1">
              {products.slice(0, 3).map((product) => (
                <GridCard
                  key={product.id}
                  product={product}
                  addToCart={this.addToCart}
                  toggleProductLike={this.toggleProductLike}
                />
              ))}
            </div>
            <div className="sectionGrid2">
              {products.slice(3, 9).map((product) => (
                <GridCard
                  key={product.id}
                  product={product}
                  addToCart={this.addToCart}
                  toggleProductLike={this.toggleProductLike}
                />
              ))}
            </div>
            <div className="sectionGrid3">
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
