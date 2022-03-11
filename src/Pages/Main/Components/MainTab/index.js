import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

export default class MainTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
    };
  }

  setCurrentId = (id) => {
    this.setState({ currentId: id });
    console.log(this.props);
    this.props.checkMenuId(this.state.currentId);
  };

  render() {
    const { currentId } = this.state;

    return (
      <div className={styles.mainTabWrap}>
        <ul className={styles.mainTabUI}>
          {CATEGORY_ARR.map((category, idx) => {
            return (
              <li className={styles.tabList} key={category}>
                <Link
                  to={`${PAGE_ARR[idx]}`}
                  onClick={() => {
                    this.setCurrentId(idx);
                  }}
                >
                  <div className={styles.tabItem}>
                    <span
                      className={
                        currentId === idx
                          ? `${styles.tabName} ${styles.active}`
                          : styles.tabName
                      }
                    >
                      {category}
                    </span>
                  </div>
                </Link>
                <hr
                  className={styles.focusUnderline}
                  // className={
                  //   currentId === idx
                  //     ? 'focusUnderline active'
                  //     : 'focusUnderline'
                  // }
                ></hr>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const CATEGORY_ARR = ['신규', '인기', '마이'];

const PAGE_ARR = ['/products/newList', '/products/hot', '/mypage/cart'];
