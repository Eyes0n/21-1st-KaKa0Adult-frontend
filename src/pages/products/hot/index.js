import HotProducts from '../../../components/pageComponents/Products/HotProducts';
import { API } from '../../../config';

export async function getServerSideProps(context) {
  const res = await fetch(`${API}/products?order=hot&pageSize=18&page=1`);
  const data = await res.json();
  const productsArrList = data.resultList;

  return {
    props: { productsArrList },
  };
}

const HotProductsPage = ({ productsArrList }) => {
  return <HotProducts products={productsArrList} />;
};

export default HotProductsPage;
