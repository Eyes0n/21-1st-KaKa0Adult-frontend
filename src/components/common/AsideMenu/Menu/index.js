import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Accordion from '../Accordion';
import styles from './index.module.scss';

class Menu extends Component {
  onLogInOut = (e) => {
    const { user, history, toggleSideMenu } = this.props;
    console.log(e);
    if (user) {
      localStorage.removeItem('user_name');
      toggleSideMenu(e);
    } else {
      history.push('/login');
    }
  };

  render() {
    const { isSlide, user, characters, categories, match } = this.props;

    return (
      <div className={`${styles.sideMenu} ${isSlide ? styles.open : ''}`}>
        <div className={styles.menuContents}>
          <article className={styles.userInfoWrap}>
            <p className={styles.userHiTxt}>
              {user ? (
                <>
                  <Link href="/mypage">
                    <a>{user}</a>
                  </Link>
                  <span>님 반가워요!</span>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                  <span>이 필요해요!</span>
                </>
              )}
            </p>
            <Link href="/products/newList">
              <a className={styles.alertBell}></a>
            </Link>
          </article>
          <ul className={styles.menuUl}>
            <li className={`${styles.menuLi} ${styles.topPadding}`}>
              <Link href={user ? '/mypage/cart' : '/products/newList'}>
                <a>장바구니 내역</a>
              </Link>
            </li>
            <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
              <Link href={user ? '/mypage/order' : '/products/newList'}>
                <a>주문·배송 내역</a>
              </Link>
            </li>
            <li className={`${styles.menuLi} ${styles.topPadding}`}>
              <Accordion
                type="character"
                title="캐릭터"
                characters={characters}
              />
            </li>
            <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
              <Accordion
                type="category"
                title="카테고리"
                categories={categories}
              />
            </li>
            <li className={`${styles.menuLi} ${styles.topPadding}`}>
              <Link href={match.path}>
                <a>공지사항</a>
              </Link>
            </li>
            <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
              <Link href={match.path}>
                <a>고객센터</a>
              </Link>
            </li>
            <li
              className={`${styles.menuLi} ${styles.borderPaddingBottom} ${styles.topPadding}`}
            >
              <Link href={match.path}>
                <a>기프트카드 조회·환불</a>
              </Link>
            </li>
            <li className={`${styles.menuLi} ${styles.topPadding}`}>
              <Link href={match.path}>
                <a>브랜드 스토리</a>
              </Link>
            </li>
            <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
              <Link href={match.path}>
                <a>매장안내</a>
              </Link>
            </li>
          </ul>
          <div
            className={`${styles.loginInOut} ${styles.topPadding}`}
            onClick={this.onLogInOut}
          >
            <p className={styles.loginInOutBtn}>
              {user ? '로그아웃' : '로그인'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
