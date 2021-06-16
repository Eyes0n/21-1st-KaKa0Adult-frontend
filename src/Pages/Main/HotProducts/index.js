import React, { Component } from 'react';
import { API } from '../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../utils/fetches';
import GridCard from './GridCard';
import { hotData } from './hotData';
import './index.scss';

export default class HotProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.setState({
      products: hotData.resultList,
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

  onCart = (updatedId) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    this.setState({
      products: updatedProducts,
    });

    if (products[updatedId - 1].cart) {
      fetchPost(`${API}/users/cart/product`, { product_id: updatedId })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail');
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  render() {
    const { products } = this.state;

    return (
      <div className="hotGridWrap">
        <div className="hotGrid">
          <div className="sectionGrid1">
            {products.slice(0, 3).map((product) => (
              <GridCard
                key={product.id}
                product={product}
                onCart={this.onCart}
                toggleProductLike={this.toggleProductLike}
              />
            ))}
          </div>
          <div className="sectionGrid2">
            {products.slice(3, 9).map((product) => (
              <GridCard
                key={product.id}
                product={product}
                onCart={this.onCart}
                toggleProductLike={this.toggleProductLike}
              />
            ))}
          </div>
          <div className="sectionGrid3">
            {products.slice(9, 12).map((product) => (
              <GridCard
                key={product.id}
                product={product}
                onCart={this.onCart}
                toggleProductLike={this.toggleProductLike}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
