import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class SubTab extends Component {
  render() {
    return (
      <div className="subTab">
        <ul className="tabLists">
          <Link className="tabList">찜한 상품</Link>
          <Link className="tabList active">장바구니</Link>
          <Link className="tabList">주문내역</Link>
        </ul>
      </div>
    );
  }
}
