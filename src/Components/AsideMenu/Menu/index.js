import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Accordion from './Accordion';
import './index.scss';

class Menu extends Component {
  render() {
    // TODO: 로그인 사용자 정보로 바꾸기

    const { isOpen, user, characters, categories } = this.props;
    return (
      <div
        className={`sideMenu ${isOpen && 'open'}`}
        onClick={(e) => e.stopPropagation(e)}
      >
        <div className="menuContents">
          <article className="userInfoWrap">
            <p className="userHiTxt">
              {user ? (
                <>
                  <Link to="/">{user}</Link>
                  <span>님 반가워요!</span>
                </>
              ) : (
                <>
                  <Link to="/">로그인</Link>
                  <span>이 필요해요!</span>
                </>
              )}
            </p>
            <Link to="/" className="alertBell"></Link>
          </article>
          <ul>
            <li className="topPadding">
              <Link to="/">장바구니 내역</Link>
            </li>
            <li className="borderPaddingBottom">
              <Link to="/">주문·배송 내역</Link>
            </li>
            <li className="topPadding">
              <Accordion
                type={'character'}
                title={'캐릭터'}
                characters={characters}
              />
            </li>
            <li className="borderPaddingBottom">
              <Accordion
                type={'category'}
                title={'카테고리'}
                categories={categories}
              />
            </li>
            <li className="topPadding">
              <Link to="/">공지사항</Link>
            </li>
            <li className="borderPaddingBottom">
              <Link to="/">고객센터</Link>
            </li>
            <li className="borderPaddingBottom topPadding ">
              <Link to="/">기프트카드 조회·환불</Link>
            </li>
            <li className="topPadding">
              <Link to="/">브랜드 스토리</Link>
            </li>
            <li className="borderPaddingBottom">
              <Link to="/">매장안내</Link>
            </li>
          </ul>
          <div className="loginInOutBtn topPadding">
            <Link to="/">{user ? '로그아웃' : '로그인'}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
