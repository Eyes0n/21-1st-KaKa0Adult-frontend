import { useState, useEffect } from 'react';
import { API } from '../../../../config';
import { fetchGet } from '../../../../utils/fetches';
import OrderHistoryCard from './OrderHistoryCard';
import styles from './index.module.scss';
import Empty from '../../../common/Empty';

const OrderList = () => {
  const [orderHistoies, setOrderHistoies] = useState(null);

  const getOrderHistory = async () => {
    const res = await fetchGet(`${API}/orders`);

    if (res.status === 204) return;

    // [{products: Array(3), recipient_info: {…}, createdAt: '2022-03-29T06:55:16.324Z'}]
    const data = await res.json();

    // [{
    //   orderId: new Date().toString,
    //   products: order_item_list, // [{},{}]
    //   recipient_info: recipient_info, // {}
    //   createdAt: new Date(), // string
    // }]
    const sortedByNewest = data?.reverse();

    // {
    //   'date1': [{product},{},...],
    //   'date2': [{},{},...],
    // }
    const groupsByCreatedAt = sortedByNewest.reduce((groups, orderHistory) => {
      const date = new Date(orderHistory.createdAt)
        .toLocaleDateString()
        .replaceAll(' ', '');
      if (!(date in groups)) {
        groups[date] = [];
      }
      groups[date].push(orderHistory);
      return groups;
    }, {});

    // ['date1', 'date2', ...] -> [{orderedAt, productsArr}, ...]
    const groupArrays = Object.keys(groupsByCreatedAt).map((date) => ({
      orderedAt: date,
      productsArr: groupsByCreatedAt[date],
    }));

    setOrderHistoies(groupArrays);
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <>
      {!orderHistoies ? (
        <Empty
          message={['주문내역이 없습니다.', '주문하러 가실까요?']}
          link={{ url: '/products/hot', text: '인기 상품 보기' }}
        />
      ) : (
        <div className={styles.wrapper}>
          <div>
            {orderHistoies?.map(({ orderedAt, productsArr = [] }) => {
              return (
                <div key={orderedAt} className={styles.orderHistories}>
                  <p className={styles.byDate}>{orderedAt}</p>
                  <OrderHistoryCard productsArr={productsArr} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
