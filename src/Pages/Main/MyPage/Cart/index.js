import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchPatch,
  fetchDelete,
  fetchGet,
} from '../../../../utils/fetches.js';
import { CART_API, API } from '../../../../config';
import CartList from './CartList';
import './index.scss';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      selectedArr: [],
      deletedArr: [],
    };
  }

  componentDidMount() {
    this.getCartData();
  }

  getCartData = async () => {
    // try {
    fetchGet(`${CART_API}/orders/order-items`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          cartData: res.items_in_cart,
          selectedArr: Array(res.length).fill(true),
        }),
      );
    // } catch {
    //   const response = await fetchGet(`/data/cartdata.json`);
    //   const data = await response.json();
    //   const cartData = data.items_in_cart.map((data) => ({
    //     ...data,
    //     selected: true,
    //   }));

    //   this.setState({
    //     cartData: cartData,
    //     selectedArr: Array(cartData.length).fill(true),
    //   });
    // }
  };

  handleQuantity = (event) => {
    const { cartData } = this.state;
    const { value, className } = event.target;
    const isMinusBtn = className === 'quantity-minus';
    const isCountOne = cartData[parseInt(value)].count === 1;

    if (isMinusBtn && isCountOne) return;
    const newQuantity = cartData.map((cartItem, index) => {
      return parseInt(value) !== index
        ? cartItem
        : {
            ...cartItem,
            count: isMinusBtn ? cartItem.count - 1 : cartItem.count + 1,
          };
    });
    this.setState({ cartData: newQuantity });

    const res = !isMinusBtn
      ? fetchPatch(`${CART_API}/orders/order-items`, {
          order_item_id: event.target.dataset.id,
          count: +event.target.dataset.count + 1,
        })
      : fetchPatch(`${CART_API}/orders/order-items`, {
          order_item_id: event.target.dataset.id,
          count: +event.target.dataset.count - 1,
        });

    res
      .then((res) => {
        if (res.ok) {
          return alert('성공');
        } else throw new Error();
      })
      .catch((err) => console.error(err));
  };

  isCheckArr = () => {
    const { selectedArr } = this.state;
    for (let isChecked of selectedArr) {
      if (isChecked) {
        return false;
      }
    }
    return true;
  };

  removeCartItem = (event, id) => {
    const { cartData } = this.state;
    const newCartData = cartData.filter((cartItem) => {
      return parseInt(id) !== parseInt(cartItem.id);
    });
    const deletedData = cartData.filter((cartItem) => {
      return parseInt(id) === parseInt(cartItem.id);
    });
    this.setState({ cartData: newCartData, deletedArr: deletedData });
    fetchDelete(`${CART_API}/orders/order-items/${event.target.dataset.id}`)
      .then((res) => res.status)
      .then((status) => {
        status === 204 ? alert('삭제성공') : alert('삭제를 실패하였습니다.');
      });
  };

  handleIsChecked = (event, id) => {
    const { selectedArr } = this.state;
    const newCheck = [...selectedArr];
    newCheck[id] = !newCheck[id];
    this.setState({ selectedArr: newCheck });
    const select = {
      order_item_id: event.target.dataset.id,
      select: event.target.className === 'fa-check-circle fas fill' ? 0 : 1,
    };
    fetchPatch(`${CART_API}/orders/${event.target.dataset.id}`, select).then(
      (res) => res.json(),
    );
  };

  selectAll = () => {
    const { selectedArr } = this.state;
    const newCheckArr = Array(selectedArr.length).fill(this.isCheckArr());
    this.setState({ selectedArr: newCheckArr });
    this.updateCartSelection();
  };

  updateCartSelection = () => {
    this.state.cartData.forEach((item) => {
      const itemToSelect = {
        order_item_id: item.order_item_id,
        select: 0,
      };
      !item.selected &&
        fetchPatch(`${CART_API}/orders/order-items`, itemToSelect)
          .then((res) => res.json())
          .then((result) => console.log(result));
    });

    this.state.cartData.forEach((item) => {
      const itemToUnselect = {
        order_item_id: item.order_item_id,
        select: 1,
      };
      item.selected &&
        fetchPatch(`${CART_API}/orders/order-items`, itemToUnselect)
          .then((res) => res.json())
          .then((result) => console.log(result));
    });
  };

  selectDelete = () => {
    const { cartData, selectedArr } = this.state;
    const checkedArr = [];
    let idx = selectedArr.indexOf(true);
    while (idx !== -1) {
      checkedArr.push(idx);
      idx = selectedArr.indexOf(true, idx + 1);
    }
    const newCheckedArr = cartData.filter((cartItem) => {
      return !checkedArr.includes(parseInt(cartItem.id));
    });
    const newDeletedArr = cartData.filter((cartItem) => {
      return checkedArr.includes(parseInt(cartItem.id));
    });
    this.setState({
      cartData: newCheckedArr,
      deletedArr: newDeletedArr,
      selectedArr: Array(newCheckedArr.length).fill(false),
    });
    const itemsToDelete = cartData.filter((item) => item.selected);
    const idsToDelete = itemsToDelete.map((item) => item.order_item_id);
    for (let itemId in idsToDelete) {
      fetchDelete(`${CART_API}/orders/order-items/${idsToDelete[itemId]}`).then(
        (res) => res.status,
      );
      // .then((status) => {
      //   status === 204
      //     ? alert('다중 삭제성공!')
      //     : alert('삭제를 실패하였습니다.');
      // });
    }
  };

  delieveDateToOrder = () => {
    return {
      pathname: '/mypage/order',
      state: {
        orderData: this.state.cartData,
      },
    };
  };

  render() {
    const { cartData, selectedArr } = this.state;
    const selectedItems = cartData.filter((item) => item.selected);
    const totalPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
    );

    return this.state.cartData.length === 0 ? (
      <div className="myPage">
        <div className="contents">
          <div className="emptyBasket">
            <div className="emptyImg"></div>
            <div className="emptyMsg">
              아직 관심 상품이 없네요!
              <br />
              귀여운 프렌즈 상품을 추천드릴게요
            </div>
            <Link to="/hotproducts" className="linkToHot">
              <span className="linkTitle">인기상품 보기</span>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="myPage">
          <div className="headerWrap">
            <div className="headerContainer">
              <div className="checkAllBox">
                <div className="checkboxLabel">
                  <i
                    className={`fa-check-circle ${
                      this.isCheckArr() ? 'far' : 'fas fill'
                    }`}
                    onClick={this.selectAll}
                  />
                </div>
                <button className="checkTitle" onClick={this.selectAll}>
                  전체선택
                </button>
                <span className="checkCount">{cartData.length}</span>
              </div>
              <div className="deleteBox">
                <button
                  type="button"
                  className="deleteButton"
                  onClick={this.selectDelete}
                ></button>
              </div>
            </div>
          </div>
          <div className="contentsWrap">
            <div className="basketDetailWrap">
              <ul className="basketDetailLists">
                {cartData &&
                  cartData.map((data, index) => {
                    return (
                      <CartList
                        id={data.id}
                        key={index}
                        item={data}
                        selectedArr={selectedArr}
                        handleQuantity={this.handleQuantity}
                        removeCartItem={this.removeCartItem}
                        handleIsChecked={this.handleIsChecked}
                      />
                    );
                  })}
              </ul>
              <div className="totalCostBarWrap">
                <div className="totalCostBar">
                  <span className="totalCostTitle">총 주문금액</span>
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
                  <span className="totalCostTitle last">총 결제금액</span>
                  <span>
                    <span className="totalCost">
                      {(totalPrice + 3000).toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomBarWrap">
          <Link
            to={{
              pathname: '/mypage/order',
              state: {
                orderData: cartData,
              },
            }}
          >
            <button>
              <span>{totalPrice.toLocaleString()}</span>원 주문 하기
            </button>
          </Link>
        </div>
      </>
    );
  }
}
