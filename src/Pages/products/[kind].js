import { useRouter } from 'next/router';
import Detail from '../../components/pageComponents/Detail';
import HotProducts from '../../components/pageComponents/Products/HotProducts';
import NewProducts from '../../components/pageComponents/Products/NewProducts';

const Products = () => {
  const router = useRouter();
  const { kind } = router.query;

  if (kind === 'new') return <NewProducts />;
  if (kind === 'hot') return <HotProducts />;

  // kind가 문자열 형태의 1,2,3,....인 경우
  return <Detail productId={kind} />;
};

export default Products;
