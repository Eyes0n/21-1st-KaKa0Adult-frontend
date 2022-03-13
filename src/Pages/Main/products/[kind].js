import { useRouter } from 'next/router';
import HotProducts from '../HotProducts';
import NewProducts from '../NewProducts';

const Products = () => {
  const router = useRouter();
  const { kind } = router.query;

  if (kind === 'new') return <NewProducts />;
  if (kind === 'hot') return <HotProducts />;

  return <div>products</div>;
};

export default Products;
