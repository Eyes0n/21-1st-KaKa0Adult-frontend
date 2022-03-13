import React, { Component } from 'react';
import styles from './index.module.scss';

export default class OrderPrice extends Component {
  render() {
    const { totalPrice } = this.props;
    return (
      <div className={styles.totalCostBarWrap}>
        <div className={styles.totalCostBar}>
          <span className={styles.totalCostTitle}>상품가</span>
          <div>
            <span>{totalPrice.toLocaleString()}</span>원
          </div>
        </div>
        <div className={styles.totalCostBar}>
          <span className={styles.totalCostTitle}>배송비</span>
          <div>
            <span>3,000</span>원
          </div>
        </div>
        <div className={styles.totalCostBar}>
          <span className={`${styles.totalCostTitle} ${styles.last}`}>
            총합
          </span>
          <span>
            <span className={styles.totalCost}>
              {(totalPrice + 3000).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
