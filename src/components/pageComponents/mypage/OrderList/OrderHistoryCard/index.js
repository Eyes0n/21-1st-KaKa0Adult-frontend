import Link from 'next/link';
import { API } from '../../../../../config';
import styles from './index.module.scss';

const OrderHistoryCard = ({ productsArr }) => {
  return (
    <>
      {productsArr?.map((products) => {
        // products : {orderId: string, products: [{}], recipient_info: {}}
        const { products: orderedProducts, orderId, deliveryState } = products;
        const totalPrice = orderedProducts
          .reduce((acc, item) => acc + Number(item.price), 0)
          .toLocaleString();

        const { id, name, imgSrc } = orderedProducts[0];
        const length = orderedProducts.length;

        return (
          <div className={styles.contentContainer} key={id}>
            <Link href={`/mypage/orders/${orderId}`}>
              <a>
                <div className={styles.orderInfo}>
                  <div className={styles.image}>
                    <img src={imgSrc} alt={name} />
                  </div>
                  <div className={styles.description}>
                    <div className={styles.titleAndPrice}>
                      <div className={styles.titleBox}>
                        <span className={styles.title}>{name}</span>
                        {length - 1 !== 0 && (
                          <span>{`외 ${length - 1}건`}</span>
                        )}
                      </div>
                      <p>총 결제 금액: {totalPrice}원</p>
                    </div>
                    <p className={styles.delivery_state}>{deliveryState}</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default OrderHistoryCard;
