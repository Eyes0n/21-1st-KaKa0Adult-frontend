import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Searchbar from './Searchbar';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchbarOn: false,
    };
  }

  handleSearch = () => {
    this.state.isSearchbarOn
      ? this.setState({
          isSearchbarOn: false,
        })
      : this.setState({
          isSearchbarOn: true,
        });
  };

  render() {
    return (
      <header className="head">
        <div className="innerHead">
          <div className="header">
            <button type="button" className="cartBtn">
              <span className="cartBtnLogo"></span>
            </button>
            <button type="button" className="hamburgerBtn">
              <span className="hamburgerBtnLogo"></span>
              <span className="hamburgerBtnBadge"></span>
            </button>
            {this.state.isSearchbarOn && (
              <Searchbar handleSearch={this.handleSearch} />
            )}
            <button
              type="button"
              className="searchBtn"
              onClick={this.handleSearch}
            >
              <span className="searchBtnLogo"></span>
            </button>
            <h1 className="titleWrap">
              <Link className="titleLink" to="/"></Link>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}
