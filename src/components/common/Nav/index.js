import React, { Component } from 'react';
import Link from 'next/link';
import AsideMenu from '../AsideMenu';
import Searchbar from './Searchbar';
import styles from './index.module.scss';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchbarOn: false,
      isOpenAside: false,
    };
  }

  toggleSearchOpen = () => {
    const { isSearchbarOn } = this.state;
    this.setState({
      isSearchbarOn: !isSearchbarOn,
    });
  };

  toggleSideMenu = (e) => {
    const { isOpenAside } = this.state;
    const classList = [...e.target.classList];

    if (
      !isOpenAside ||
      classList.includes('sideMenuWrap') ||
      classList.includes('loginInOutBtn')
    ) {
      this.setState({ isOpenAside: !isOpenAside });
    }
  };

  render() {
    const { isOpenAside, isSearchbarOn } = this.state;

    return (
      <>
        {isOpenAside && <AsideMenu toggleSideMenu={this.toggleSideMenu} />}
        {isSearchbarOn ? (
          <Searchbar searchbarOff={this.toggleSearchOpen} />
        ) : (
          <header className={styles.Nav}>
            <div className={styles.innerHead}>
              <div className={styles.header}>
                <button
                  type="button"
                  className={styles.hamburgerBtn}
                  onClick={this.toggleSideMenu}
                >
                  <span className={styles.hamburgerBtnLogo}></span>
                  <span className={styles.hamburgerBtnBadge}></span>
                </button>
                <h1 className={styles.titleWrap}>
                  <Link href="/products/new">
                    <a className={styles.titleLink}></a>
                  </Link>
                </h1>
                <button
                  type="button"
                  className={styles.searchBtn}
                  onClick={this.toggleSearchOpen}
                >
                  <span className={styles.searchBtnLogo}></span>
                </button>
                <Link href="/mypage/cart">
                  <button type="button" className={styles.cartBtn}>
                    <span className={styles.cartBtnLogo}></span>
                  </button>
                </Link>
              </div>
            </div>
          </header>
        )}
      </>
    );
  }
}
