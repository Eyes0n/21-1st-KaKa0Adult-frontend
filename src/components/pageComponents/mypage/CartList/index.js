import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class CartList extends Component {
  render() {
    const {
      id,
      item,
      selectedArr,
      handleQuantity,
      removeCartItem,
      handleIsChecked,
    } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className={styles.basketItemWrap} key={item.order_item_id}>
        <label className={styles.checkboxLabel}>
          <i
            data-id={item.order_item_id}
            className={`fa-check-circle ${
              selectedArr[id] ? 'fas fill' : 'far'
            }`}
            onClick={(e) => handleIsChecked(e, id)}
          />
        </label>
        <div className={styles.thumbWrap}>
          <Link href="/">
            <a className={styles.linkThumb}>
              <span className={styles.thumbContainer}>
                <span className={styles.imgBox}>
                  <img
                    className={styles.thumbImage}
                    alt={item.name}
                    src={item.image_url}
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
              data-id={item.order_item_id}
              onClick={(e) => removeCartItem(e, id)}
            />
          </div>
          <div className={styles.priceWrap}>
            <span>{price}원</span>
          </div>
          <div className={styles.countWrap}>
            <div className={styles.itemCounter}>
              <button
                value={id}
                data-id={item.order_item_id}
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
                value={id}
                data-id={item.order_item_id}
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
