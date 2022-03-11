import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import Cart from './Cart';
import SubTab from './Components/SubTab';
import Order from './Cart/Order';
import { useRouter } from 'next/router';

const OrderList = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}
  >
    주문 내역
  </div>
);

const Wish = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}
  >
    찜한 상품
  </div>
);

const MAPPING_COMPONENT = {
  wish: <Wish />,
  cart: <Cart />,
  payment: <Order />,
  orderlist: <OrderList />,
};

const Mypage = () => {
  const router = useRouter();
  const { keyword } = router.query;

  return (
    <>
      <Nav />
      <MainTab />
      <SubTab />
      {MAPPING_COMPONENT[keyword]}
    </>
  );
};

export default Mypage;
