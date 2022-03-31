import { withRouter } from 'next/router';
import OrderDetails from '../../../components/pageComponents/mypage/OrderDetails';

const OrderDetailpage = ({ router }) => {
  const { orderId } = router.query;

  return <OrderDetails orderId={orderId} />;
};

export default withRouter(OrderDetailpage);
