import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class Product extends Component {
  render() {
    const { product, index, addToCart, toggleProductLike } = this.props;

    return (
      <div className="product">
        <div
          className={product.like ? 'heart addToLike' : 'heart'}
          onClick={() => toggleProductLike(product.id, index)}
        >
          <button className="likeBtn" type="button">
            좋아요
          </button>
        </div>

        <Link to={`/products/${product.id}`} className="productLink">
          <div className="productImgWrap">
            <img src={product.image} alt="상품 이미지" />
          </div>
          <p className="productName">{product.name}</p>
          <p className="productPrice">
            <span className="price">{(+product.price)?.toLocaleString()}</span>
            <span className="unit">원</span>
          </p>

          {!product.stock && (
            <div className="soldout">
              <label className="soldoutLabel"></label>
            </div>
          )}
        </Link>

        <div
          className={product.cart ? 'cart addToCart' : 'cart'}
          onClick={(e) => addToCart(product.id, index)}
        >
          <button className="cartBtn" type="button">
            담기
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
