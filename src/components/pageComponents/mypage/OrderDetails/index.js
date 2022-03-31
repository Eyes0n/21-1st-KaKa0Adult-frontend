import { useState, useEffect } from 'react';
import { API } from '../../../../config';
import { fetchGet } from '../../../../utils/fetches';
import styles from './index.module.scss';

const OrderDetails = ({ orderId }) => {
  const [details, setDetails] = useState({
    createdAt: '',
    deliveryState: '',
    orderId: '',
    products: [],
    recipient_info: { name: '', phone_number: '', address: '', request: '' },
  });

  const getOrderDetailAPI = async () => {
    const res = await fetchGet(`${API}/orders/${orderId}`);

    if (res.status !== 200) return;

    const data = await res.json();
    setDetails(data);
  };

  useEffect(() => {
    getOrderDetailAPI();
  }, []);

  const {
    products,
    deliveryState,
    createdAt,
    recipient_info: recipient,
  } = details;

  const orderer = {
    name: 'orderer',
    phone_number: '111',
    email: '111@xxx.com',
  };

  const productsPrice = products.reduce(
    (acc, product) => acc + product.price,
    0
  );
  return (
    <div>
      <div>
        <p>주문번호 {orderId}</p>
        <p>{deliveryState}</p>
      </div>
      <div>
        주문 제품
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <div>
        결제정보
        <div>결제 수단</div>
        <div>결제 일시: {createdAt}</div>
        <div>상품가격 {productsPrice}</div>
        <div>배송비</div>
        <div>포인트</div>
        <div>기프트카드</div>
        <div>최종 결제금액</div>
      </div>
      <div>
        배송지 정보
        <div>
          주문고객
          <p>
            <span>{orderer.name}</span>
            <span>{orderer.phone_number}</span>
          </p>
          <p>{orderer.email}</p>
        </div>
        <div>
          받는분
          <p>
            <span>{recipient.name}</span>
            <span>{recipient.phone_number}</span>
          </p>
          <p>{recipient.address}</p>
          <p>{recipient.request}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
