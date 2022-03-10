import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Accordion from '../Accordion';
import './index.scss';

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
      <div className={`sideMenu ${isSlide ? 'open' : ''}`}>
        <div className="menuContents">
          <article className="userInfoWrap">
            <p className="userHiTxt">
              {user ? (
                <>
                  <Link to="/mypage">{user}</Link>
                  <span>님 반가워요!</span>
                </>
              ) : (
                <>
                  <Link to="/login">로그인</Link>
                  <span>이 필요해요!</span>
                </>
              )}
            </p>
            <Link to="/products/newList" className="alertBell"></Link>
          </article>
          <ul className="menuUl">
            <li className="menuLi topPadding">
              <Link to={user ? '/mypage/cart' : '/products/newList'}>
                장바구니 내역
              </Link>
            </li>
            <li className="menuLi borderPaddingBottom">
              <Link to={user ? '/mypage/order' : '/products/newList'}>
                주문·배송 내역
              </Link>
            </li>
            <li className="menuLi topPadding">
              <Accordion
                type="character"
                title="캐릭터"
                characters={characters}
              />
            </li>
            <li className="menuLi borderPaddingBottom">
              <Accordion
                type="category"
                title="카테고리"
                categories={categories}
              />
            </li>
            <li className="menuLi topPadding">
              <Link to={match.path}>공지사항</Link>
            </li>
            <li className="menuLi borderPaddingBottom">
              <Link to={match.path}>고객센터</Link>
            </li>
            <li className="menuLi borderPaddingBottom topPadding ">
              <Link to={match.path}>기프트카드 조회·환불</Link>
            </li>
            <li className="menuLi topPadding">
              <Link to={match.path}>브랜드 스토리</Link>
            </li>
            <li className="menuLi borderPaddingBottom">
              <Link to={match.path}>매장안내</Link>
            </li>
          </ul>
          <div className="loginInOut topPadding" onClick={this.onLogInOut}>
            <p className="loginInOutBtn">{user ? '로그아웃' : '로그인'}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
