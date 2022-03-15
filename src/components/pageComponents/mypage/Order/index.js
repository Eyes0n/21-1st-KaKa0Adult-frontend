import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import OrderList from './OrderList';
import OrderPrice from './OrderPrice';
import { fetchPost } from '../../../../utils/fetches';
import { API } from '../../../../config';
import styles from './index.module.scss';

const Order = ({ router }) => {
  const [orderData, setOrderData] = useState([]);
  const [personalData, setPersonalData] = useState({
    name: '',
    phone_number: '',
    address: '',
    request: '',
  });

  const {
    query: { cartData },
  } = router;

  useEffect(() => {
    const newCartData = JSON.parse(decodeURIComponent(cartData));
    setOrderData(newCartData);
  }, []);

  const handleInput = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone_number, address, request } = personalData;
    const itemsToOrder = orderData?.filter((item) => item.selected);
    const idsToOrder = itemsToOrder.map((item) => item.order_item_id);

    fetchPost(`${API}/orders`, {
      order_item_list: idsToOrder,
      recipient_info: {
        name,
        phone_number,
        address,
        request,
      },
    }).then((res) => res.message);

    router.push('/mypage/orderlist');
  };

  const dataByCart = orderData;
  let selectedItems;
  if (dataByCart?.length > 0) {
    selectedItems = dataByCart?.filter((item) => item.selected);
  }
  const totalPrice = Math.floor(
    selectedItems?.reduce((acc, item) => acc + item.price * item.count, 0),
  );

  return (
    <div className={styles.Order}>
      <form className={styles.formWrap} onSubmit={handleSubmit}>
        <section className={styles.itemToOrder}>
          <h3 className={styles.title}>01 주문상품</h3>
          <div className={styles.contents}>
            <ul className={styles.orderDetailList}>
              {dataByCart?.map((item, idx) => {
                return (
                  <OrderList key={item.order_item_id} id={idx} item={item} />
                );
              })}
            </ul>
            <OrderPrice totalPrice={totalPrice} />
          </div>
        </section>
        <section className={styles.shippingInfo}>
          <h3 className={styles.title}>02 배송지정보</h3>
          <div className={styles.infoWrap}>
            <div className={styles.subtitleContainer}>
              <h4 className={styles.subtitle}>받는분</h4>
            </div>
            <div className={styles.nameContainer}>
              <input
                className={styles.name}
                name="name"
                type="text"
                placeholder="이름"
                onChange={handleInput}
                value={personalData.name}
              />
            </div>
            <div className={styles.phoneContainer}>
              <input
                className={styles.phone}
                name="phone_number"
                type="text"
                placeholder="전화번호 (-없이 입력)"
                onChange={handleInput}
                value={personalData.phone_number}
              />
            </div>
            <div className={styles.addressContainer}>
              <input
                className={styles.address}
                name="address"
                type="text"
                placeholder="주소"
                onChange={handleInput}
                value={personalData.address}
              />
            </div>
            <div className={styles.requestContainer}>
              <textarea
                className={styles.request}
                name="request"
                placeholder="배송 요청메시지가 있으시면 남겨주세요."
                onChange={handleInput}
                value={personalData.request}
              ></textarea>
            </div>
            <div className={styles.saveToMyInfoContainer}>
              <label className={styles.saveToMyInfoLabel}>
                <input
                  className={styles.saveToMyInfoCheck}
                  type="checkbox"
                  name="saveToMyInfo"
                  readOnly
                />
                내 정보 및 기본 배송지로 저장
              </label>
            </div>
            <div className={styles.noticeContainer}>
              <div className={styles.intendedDday}>
                <i className="fas fa-shuttle-van"></i> 6/16(수) 도착 예정
              </div>
              <div className={styles.para}>
                오후 3시 이전 주문시 당일 출고
                <br />
                출고 후 평균 1~2일 이내 수령
                <br />
                영업일 기준이며, 경우에 따라 추가소요될 수 있습니다.
                <br />
                택배사 파업으로 일부 지역의 배송이 일시적으로 중단됩니다.
                <br />
                (중단 지역은 “공지사항“에서 확인이 가능합니다.)
              </div>
            </div>
          </div>
        </section>
        <section className={styles.payment}>
          <h3 className={styles.title}>03 결제하기</h3>
          <div className={styles.paymentWrap}>
            <OrderPrice totalPrice={totalPrice} />
            <div className={styles.payMethod}>
              <h4 className={styles.subtitle}>결제수단 선택</h4>
              <div className={styles.selectBox}>
                <label htmlFor="kakaopay" className="">
                  카카오페이
                  <input id="kakaopay" type="radio" value="kakaopay" />
                </label>
                <label htmlFor="creditcard" className="">
                  신용카드
                  <input id="creditcard" type="radio" value="creditcard" />
                </label>
              </div>
              <div className={styles.agreeBox}>
                <label className={styles.agreeToNotice}>
                  <input className={styles.checkbox} type="checkbox" />
                  상품 주문 및 배송정보 수집에 동의합니다<span>[필수]</span>
                </label>
                <label className={styles.agreeToNotice}>
                  <input className={styles.checkbox} type="checkbox" />
                  주문 상품의 명시내용과 사용조건을 확인하였으며, 취소환불
                  규정에 동의합니다<span>[필수]</span>
                </label>
              </div>
              <div>
                <button type="submit" className={styles.submitBtn}>
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default withRouter(Order);
