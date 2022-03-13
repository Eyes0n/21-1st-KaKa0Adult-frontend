import { useRouter } from 'next/router';
import HotProducts from '../../components/pageComponents/products/HotProducts';
import NewProducts from '../../components/pageComponents/products/NewProducts';

const Products = () => {
  const router = useRouter();
  const { kind } = router.query;
  console.log(kind);

  if (kind === 'new') return <NewProducts />;
  if (kind === 'hot') return <HotProducts />;

  return <div>products</div>;
};

export default Products;
