import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class SubTab extends Component {
  render() {
    return (
      <div className={styles.subTab}>
        <ul className={styles.tabLists}>
          <Link className={styles.tabList}>찜한 상품</Link>
          <Link className={`${styles.tabList} ${styles.active}`}>장바구니</Link>
          <Link className={styles.tabList}>주문내역</Link>
        </ul>
      </div>
    );
  }
}
