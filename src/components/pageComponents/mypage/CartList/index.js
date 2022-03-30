import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class CartList extends Component {
  render() {
    const {
      idx,
      item,
      selectedArr,
      handleQuantity,
      removeCartItem,
      handleIsChecked,
    } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className={styles.basketItemWrap} key={item.id}>
        <label className={styles.checkboxLabel}>
          <i
            data-id={item.id}
            className={`fa-check-circle ${
              selectedArr[idx] ? 'fas fill' : 'far'
            }`}
            onClick={(e) => handleIsChecked(e, idx)}
          />
        </label>
        <div className={styles.thumbWrap}>
          <Link href={`/products/${item.id}`}>
            <a className={styles.linkThumb}>
              <span className={styles.thumbContainer}>
                <span className={styles.imgBox}>
                  <img
                    className={styles.thumbImage}
                    alt={item.name}
                    src={item.imgSrc}
                  />
                </span>
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.titleWrap}>
            <div className={styles.title}>{item.name}</div>
            <button
              className={styles.deleteButton}
              data-id={item.id}
              onClick={(e) => removeCartItem(e, idx)}
            />
          </div>
          <div className={styles.priceWrap}>
            <span>{price}원</span>
          </div>
          <div className={styles.countWrap}>
            <div className={styles.itemCounter}>
              <button
                value={idx}
                data-id={item.id}
                data-count={item.count}
                className={styles['quantity-minus']}
                onClick={handleQuantity}
              >
                -
              </button>
              <input
                value={`${item.count}`}
                readOnly
                className={styles.qtyDp}
              ></input>
              <button
                value={idx}
                data-id={item.id}
                data-count={item.count}
                className={styles['quantity-plus']}
                onClick={handleQuantity}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
