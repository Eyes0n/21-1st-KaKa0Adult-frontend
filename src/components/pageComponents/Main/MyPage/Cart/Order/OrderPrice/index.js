import React, { Component } from 'react';
import './index.scss';

export default class OrderPrice extends Component {
  render() {
    const { totalPrice } = this.props;
    return (
      <div className="totalCostBarWrap">
        <div className="totalCostBar">
          <span className="totalCostTitle">상품가</span>
          <div>
            <span>{totalPrice.toLocaleString()}</span>원
          </div>
        </div>
        <div className="totalCostBar">
          <span className="totalCostTitle">배송비</span>
          <div>
            <span>3,000</span>원
          </div>
        </div>
        <div className="totalCostBar">
          <span className="totalCostTitle last">총합</span>
          <span>
            <span className="totalCost">
              {(totalPrice + 3000).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
