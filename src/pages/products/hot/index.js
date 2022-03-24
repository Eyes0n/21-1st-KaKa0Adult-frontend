import HotProducts from '../../../components/pageComponents/Products/HotProducts';
import { API } from '../../../config';

export async function getServerSideProps(context) {
  const res = await fetch(`${API}/products?order=hot&pageSize=18&page=1`);
  const data = await res.json();
  const products = data.resultList;

  return {
    props: { products },
  };
}

const HotProductsPage = ({ products }) => {
  return <HotProducts products={products} />;
};

export default HotProductsPage;
