import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class GridCard extends Component {
  render() {
    const { product, addToCart, toggleProductLike } = this.props;

    return (
      <div className="gridItem">
        <div
          className={product.like ? 'gridHeart gridAddToLike' : 'gridHeart'}
          onClick={() => toggleProductLike(product.id)}
        >
          <button className="gridLikeBtn" type="button">
            좋아요
          </button>
        </div>

        <Link to={`/products/${product.id}`} className="gridLink">
          <div className="gridImg">
            <img alt={product.name} src={product.image} alt="상품 이미지" />
          </div>

          {!Number(product.stock) && (
            <div className="gridSoldout">
              <label className="gridSoldoutLabel"></label>
            </div>
          )}
        </Link>

        <div
          className={product.cart ? 'girdCart girdAddToCart' : 'girdCart'}
          onClick={() => addToCart(product.id)}
        >
          <button className="gridCartBtn" type="button">
            담기
          </button>
        </div>
      </div>
    );
  }
}

export default GridCard;
