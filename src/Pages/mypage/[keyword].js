import Nav from '../../components/common/Nav';
import MainTab from '../../components/common/MainTab';
import SubTab from '../../components/pageComponents/mypage/SubTab';
import Cart from '../../components/pageComponents/mypage/Cart';
import Order from '../../components/pageComponents/mypage/Order';
import OrderList from '../../components/pageComponents/mypage/OrderList';
import Wish from '../../components/pageComponents/mypage/Wish';
import { useRouter } from 'next/router';

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
