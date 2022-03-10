import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartList extends Component {
  render() {
    const {
      id,
      item,
      selectedArr,
      handleQuantity,
      removeCartItem,
      handleIsChecked,
    } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className="basketItemWrap" key={item.order_item_id}>
        <label className="checkboxLabel">
          <i
            data-id={item.order_item_id}
            className={`fa-check-circle ${
              selectedArr[id] ? 'fas fill' : 'far'
            }`}
            onClick={(e) => handleIsChecked(e, id)}
          />
        </label>
        <div className="thumbWrap">
          <Link to="/" className="linkThumb">
            <span className="thumbContainer">
              <span className="imgBox">
                <img
                  className="thumbImage"
                  alt={item.name}
                  src={item.image_url}
                />
              </span>
            </span>
          </Link>
        </div>
        <div className="itemInfo">
          <div className="titleWrap">
            <div className="title">{item.name}</div>
            <button
              className="deleteButton"
              data-id={item.order_item_id}
              onClick={(e) => removeCartItem(e, id)}
            />
          </div>
          <div className="priceWrap">
            <span>{price}원</span>
          </div>
          <div className="countWrap">
            <div className="itemCounter">
              <button
                value={id}
                data-id={item.order_item_id}
                data-count={item.count}
                className="quantity-minus"
                onClick={handleQuantity}
              >
                -
              </button>
              <input value={`${item.count}`} readOnly className="qtyDp"></input>
              <button
                value={id}
                data-id={item.order_item_id}
                data-count={item.count}
                className="quantity-plus"
                onClick={handleQuantity}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
