import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

class GridCard extends Component {
  render() {
    const { product, addToCart, toggleProductLike } = this.props;

    return (
      <div className={styles.gridItem}>
        <div
          className={
            product.like
              ? `${styles.gridHeart} ${gridAddToLike}`
              : styles.gridHeart
          }
          onClick={() => toggleProductLike(product.id)}
        >
          <button className={styles.gridLikeBtn} type="button">
            좋아요
          </button>
        </div>

        <Link href={`/products/${product.id}`} className={styles.gridLink}>
          <div className={styles.gridImg}>
            <img alt={product.name || '상품 이미지'} src={product.image} />
          </div>

          {!Number(product.stock) && (
            <div className={styles.gridSoldout}>
              <label className={styles.gridSoldoutLabel}></label>
            </div>
          )}
        </Link>

        <div
          className={
            product.cart
              ? `${styles.girdCart} ${styles.girdAddToCart}`
              : styles.girdCart
          }
          onClick={() => addToCart(product.id)}
        >
          <button className={styles.gridCartBtn} type="button">
            담기
          </button>
        </div>
      </div>
    );
  }
}

export default GridCard;
