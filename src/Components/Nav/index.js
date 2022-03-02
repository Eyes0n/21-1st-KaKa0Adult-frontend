import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../AsideMenu';
import './index.scss';
import Searchbar from './Searchbar';

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
          <header className="Nav">
            <div className="innerHead">
              <div className="header">
                <button
                  type="button"
                  className="hamburgerBtn"
                  onClick={this.toggleSideMenu}
                >
                  <span className="hamburgerBtnLogo"></span>
                  <span className="hamburgerBtnBadge"></span>
                </button>
                <h1 className="titleWrap">
                  <Link to="/products/newList" className="titleLink"></Link>
                </h1>
                <button
                  type="button"
                  className="searchBtn"
                  onClick={this.toggleSearchOpen}
                >
                  <span className="searchBtnLogo"></span>
                </button>
                <Link to="/mypage/cart">
                  <button type="button" className="cartBtn">
                    <span className="cartBtnLogo"></span>
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
