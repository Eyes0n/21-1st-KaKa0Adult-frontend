import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Product = ({ product, addToCart, toggleProductLike }) => {
  return (
    <div className={styles.product}>
      <div
        className={
          product.like ? `${styles.heart} ${styles.addToLike}` : styles.heart
        }
        onClick={() => toggleProductLike(product.id)}
      >
        <button className={styles.likeBtn} type="button">
          좋아요
        </button>
      </div>

      <Link href={`/products/${product.id}`}>
        <a className={styles.productLink}>
          <div className={styles.productImgWrap}>
            <img src={product.imgSrc} alt="상품 이미지" />
          </div>
          <p className={styles.productName}>{product.name}</p>
          <p className={styles.productPrice}>
            <span className={styles.price}>
              {(+product.price)?.toLocaleString()}
            </span>
            <span className={styles.unit}>원</span>
          </p>

          {!product.stock && (
            <div className={styles.soldout}>
              <label className={styles.soldoutLabel}></label>
            </div>
          )}
        </a>
      </Link>

      <div
        className={
          product.cart ? `${styles.cart} ${styles.addToCart}` : styles.cart
        }
        onClick={() => addToCart(product.id)}
      >
        <button className={styles.cartBtn} type="button">
          담기
        </button>
      </div>
    </div>
  );
};

export default Product;
