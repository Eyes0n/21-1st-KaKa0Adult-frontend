import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Accordion from '../Accordion';
import styles from './index.module.scss';

const Menu = ({ isSlide, user, characters, categories, closeSideMenu }) => {
  const router = useRouter();

  const onLogIn = () => {
    router.push('/login');
  };

  const onLogOut = (e) => {
    if (user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      closeSideMenu(e);
    }
  };

  return (
    <div className={`${styles.sideMenu} ${isSlide ? styles.open : ''}`}>
      <div className={styles.menuContents}>
        <article className={styles.userInfoWrap}>
          <p className={styles.userHiTxt}>
            {user ? (
              <>
                <Link href="/mypage/myinfo">
                  <a>
                    <span onClick={closeSideMenu}>{user}</span>
                  </a>
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
          <Link href="/products/new">
            <a className={styles.alertBell}></a>
          </Link>
        </article>
        <ul className={styles.menuUl}>
          <li
            className={`${styles.menuLi} ${styles.topPadding}`}
            onClick={closeSideMenu}
          >
            <Link href={user ? '/mypage/cart' : '/login'}>
              <a className="order" onClick={closeSideMenu}>
                장바구니 내역
              </a>
            </Link>
          </li>
          <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
            <Link href={user ? '/mypage/orderlist' : '/login'}>
              <a className="order" onClick={closeSideMenu}>
                주문·배송 내역
              </a>
            </Link>
          </li>
          <li className={`${styles.menuLi} ${styles.topPadding}`}>
            <Accordion
              type="character"
              title="캐릭터"
              characters={characters}
              closeSideMenu={closeSideMenu}
            />
          </li>
          <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
            <Accordion
              type="category"
              title="카테고리"
              categories={categories}
              closeSideMenu={closeSideMenu}
            />
          </li>
          <li className={`${styles.menuLi} ${styles.topPadding}`}>
            <Link href="/">
              <a>공지사항</a>
            </Link>
          </li>
          <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
            <Link href="/">
              <a>고객센터</a>
            </Link>
          </li>
          <li
            className={`${styles.menuLi} ${styles.borderPaddingBottom} ${styles.topPadding}`}
          >
            <Link href="/">
              <a>기프트카드 조회·환불</a>
            </Link>
          </li>
          <li className={`${styles.menuLi} ${styles.topPadding}`}>
            <Link href="/">
              <a>브랜드 스토리</a>
            </Link>
          </li>
          <li className={`${styles.menuLi} ${styles.borderPaddingBottom}`}>
            <Link href="/">
              <a>매장안내</a>
            </Link>
          </li>
        </ul>
        <div
          className={`${styles.loginInOut} ${styles.topPadding}`}
          onClick={user ? onLogOut : onLogIn}
        >
          <p className={styles.loginInOutBtn}>{user ? '로그아웃' : '로그인'}</p>
        </div>
      </div>
    </div>
  );
};
export default Menu;
