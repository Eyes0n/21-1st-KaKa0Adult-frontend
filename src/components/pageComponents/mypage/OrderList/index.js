import { useState, useEffect } from 'react';
import { API } from '../../../../config';
import { fetchGet } from '../../../../utils/fetches';
import OrderHistoryCard from './OrderHistoryCard';
import styles from './index.module.scss';

const OrderList = () => {
  const [orderHistoies, setOrderHistoies] = useState([
    { orderedAt: '', productsArr: [] },
  ]);

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
    <div className={styles.wrapper}>
      <div>
        {orderHistoies?.map(({ orderedAt, productsArr = [] }) => {
          console.log('productsArr', productsArr);
          return (
            <div key={orderedAt} className={styles.orderHistories}>
              <p className={styles.byDate}>{orderedAt}</p>
              <OrderHistoryCard productsArr={productsArr} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
