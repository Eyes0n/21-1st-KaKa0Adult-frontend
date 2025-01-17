import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPatch, fetchDelete, fetchGet } from '../../../../utils/fetches';
import { CART_API, API } from '../../../../config';
import CartList from '../CartList';
import { DELIVERY_CHARGE } from '../../../../Constants';
import styles from './index.module.scss';

const Cart = () => {
  const [cart, setCart] = useState({
    cartData: [],
    selectedArr: [],
    deletedArr: [],
  });

  const getCartData = async () => {
    // fetchGet(`${CART_API}/orders/order-items`)
    //   .then((res) => res.json())
    //   .then((res) =>
    //     setCart(prev =>({
    //       ...prev
    //       cartData: res.items_in_cart,
    //       selectedArr: Array(res.length).fill(true),
    //     })),
    //   );

    const response = await fetchGet(`/data/cartdata.json`);
    const data = await response.json();

    setCart((prev) => ({
      ...prev,
      cartData: data['items_in_cart'],
      selectedArr: Array(data['items_in_cart'].length).fill(true),
    }));
  };

  useEffect(() => {
    getCartData();
  }, []);

  const handleQuantity = (event) => {
    const { value, className } = event.target;
    const { cartData } = cart;
    const isMinusBtn = className.match(/quantity-minus/) !== null;
    const isCountOne = cartData[parseInt(value)].count === 1;

    if (isMinusBtn && isCountOne) {
      unCheckItemAmountZero(parseInt(value));
      handleIsChecked(parseInt(value));
      return;
    }

    const newQuantity = cartData.map((cartItem, index) => {
      return parseInt(value) !== index
        ? cartItem
        : {
            ...cartItem,
            count: isMinusBtn ? cartItem.count - 1 : cartItem.count + 1,
          };
    });
    setCart((prev) => ({
      ...prev,
      cartData: newQuantity,
    }));

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

  const isCheckArr = () => {
    const { selectedArr } = cart;
    for (let isChecked of selectedArr) {
      if (isChecked) {
        return false;
      }
      return true;
    }
  };

  const removeCartItem = (event, id) => {
    const { cartData } = cart;
    const newCartData = cartData.filter((cartItem) => {
      return parseInt(id) !== parseInt(cartItem.id);
    });
    const deletedData = cartData.filter((cartItem) => {
      return parseInt(id) === parseInt(cartItem.id);
    });
    setCart((prev) => ({
      ...prev,
      cartData: newCartData,
      deletedArr: deletedData,
    }));
    fetchDelete(`${CART_API}/orders/order-items/${event.target.dataset.id}`)
      .then((res) => res.status)
      .then((status) => {
        status === 204 ? alert('삭제성공') : alert('삭제를 실패하였습니다.');
      });
  };

  const handleIsChecked = (event, id) => {
    const { selectedArr } = cart;
    const newCheck = [...selectedArr];
    newCheck[id] = !newCheck[id];
    setCart((prev) => ({
      ...prev,
      selectedArr: newCheck,
    }));
    const select = {
      order_item_id: event.target.dataset.id,
      select: event.target.className.match(/fa-check-circle fas fill/) ? 0 : 1,
    };
    fetchPatch(`${CART_API}/orders/${event.target.dataset.id}`, select).then(
      (res) => res.json(),
    );
  };

  const updateCartSelection = () => {
    const { cartData } = cart;
    cartData.forEach((item) => {
      const itemToSelect = {
        order_item_id: item.order_item_id,
        select: 0,
      };
      !item.selected &&
        fetchPatch(`${CART_API}/orders/order-items`, itemToSelect)
          .then((res) => res.json())
          .then((result) => console.log(result));
    });

    cartData.forEach((item) => {
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

  const selectAll = () => {
    const { selectedArr } = cart;
    const newCheckArr = Array(selectedArr.length).fill(isCheckArr());
    setCart((prev) => ({
      ...prev,
      selectedArr: newCheckArr,
    }));
    updateCartSelection();
  };

  const selectDelete = () => {
    const { cartData, selectedArr } = cart;
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
    setCart({
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

  const { cartData, selectedArr } = cart;
  const selectedItems = cartData?.filter((item) => item.selected);
  const totalPrice = Math.floor(
    selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
  );

  return cartData.length === 0 ? (
    <div className={styles.myPage}>
      <div className={styles.contents}>
        <div className={styles.emptyBasket}>
          <div className={styles.emptyImg}></div>
          <div className={styles.emptyMsg}>
            아직 관심 상품이 없네요!
            <br />
            귀여운 프렌즈 상품을 추천드릴게요
          </div>
          <Link href="/products/hot">
            <a className={styles.linkToHot}>
              <span className={styles.linkTitle}>인기상품 보기</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.myPage}>
        <div className={styles.headerWrap}>
          <div className={styles.headerContainer}>
            <div className={styles.checkAllBox}>
              <div className={styles.checkboxLabel}>
                <i
                  className={`fa-check-circle ${
                    isCheckArr() ? 'far' : 'fas fill'
                  }`}
                  onClick={selectAll}
                ></i>
              </div>
              <button className={styles.checkTitle} onClick={selectAll}>
                전체선택
              </button>
              <span className={styles.checkCount}>{cartData.length}</span>
            </div>
            <div className={styles.deleteBox}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={selectDelete}
              ></button>
            </div>
          </div>
        </div>
        <div className={styles.contentsWrap}>
          <div className={styles.basketDetailWrap}>
            <ul className={styles.basketDetailLists}>
              {cartData &&
                cartData.map((data) => {
                  return (
                    <CartList
                      id={data.id}
                      key={data.id}
                      item={data}
                      selectedArr={selectedArr}
                      handleQuantity={handleQuantity}
                      removeCartItem={removeCartItem}
                      handleIsChecked={handleIsChecked}
                    />
                  );
                })}
            </ul>
            <div className={styles.totalCostBarWrap}>
              <div className={styles.totalCostBar}>
                <span className={styles.totalCostTitle}>총 주문금액</span>
                <div>
                  <span>{totalPrice.toLocaleString()}</span>원
                </div>
              </div>
              <div className={styles.totalCostBar}>
                <span className={styles.totalCostTitle}>배송비</span>
                <div>
                  <span>{DELIVERY_CHARGE.toLocaleString()}</span>원
                </div>
              </div>
              <div className={styles.totalCostBar}>
                <span className={`${styles.totalCostTitle} ${styles.last}`}>
                  총 결제금액
                </span>
                <span>
                  <span className={styles.totalCost}>
                    {(totalPrice + DELIVERY_CHARGE).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBarWrap}>
        <Link
          href={{
            pathname: '/mypage/[keyword]',
            query: {
              keyword: 'payment',
              cartData: encodeURIComponent(JSON.stringify(cartData)),
            },
          }}
          as="/mypage/payment"
        >
          <a>
            <button>
              <span>{(totalPrice + DELIVERY_CHARGE).toLocaleString()}</span>원
              주문 하기
            </button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Cart;
