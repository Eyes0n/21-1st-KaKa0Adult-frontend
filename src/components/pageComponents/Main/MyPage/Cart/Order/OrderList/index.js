import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class OrderList extends Component {
  render() {
    const { item } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className="basketItemWrap" id={item.id}>
        <label className="checkboxLabel"></label>
        <div className="thumbWrap">
          <Link to="/" className="linkThumb">
            <span className="thumbContainer">
              <span className="imgBox">
                <img
                  className="thumbImage"
                  alt={item.name}
                  src="/images/thumb.jpeg"
                />
              </span>
            </span>
          </Link>
        </div>
        <div className="itemInfo">
          <div className="titleWrap">
            <div className="itemtitle">{item.name}</div>
          </div>
          <div className="specWrap">
            <div className="countWrap">
              <input value={`${item.count}`} readOnly className="qtyDp" />
            </div>
            <div className="priceWrap">
              <span>{price}원</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
