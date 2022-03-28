import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class OrderCard extends Component {
  render() {
    const { item } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className={styles.basketItemWrap} id={item.id}>
        <label className={styles.checkboxLabel}></label>
        <div className={styles.thumbWrap}>
          <Link href="/">
            <a className={styles.linkThumb}>
              <span className={styles.thumbContainer}>
                <span className={styles.imgBox}>
                  <img
                    className={styles.thumbImage}
                    alt={item.name}
                    src="/images/thumb.jpeg"
                  />
                </span>
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.titleWrap}>
            <div className={styles.itemtitle}>{item.name}</div>
          </div>
          <div className={styles.specWrap}>
            <div className={styles.countWrap}>
              <input
                value={`${item.count}`}
                readOnly
                className={styles.qtyDp}
              />
            </div>
            <div className={styles.priceWrap}>
              <span>{price}원</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
