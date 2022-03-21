import Nav from '../../components/common/Nav';
import MainTab from '../../components/common/MainTab';
import SubTab from '../../components/pageComponents/Mypage/SubTab';
import Cart from '../../components/pageComponents/Mypage/Cart';
import Order from '../../components/pageComponents/Mypage/Order';
import OrderList from '../../components/pageComponents/Mypage/OrderList';
import Wish from '../../components/pageComponents/Mypage/Wish';
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
      <SubTab />
      {MAPPING_COMPONENT[keyword]}
    </>
  );
};

export default Mypage;
