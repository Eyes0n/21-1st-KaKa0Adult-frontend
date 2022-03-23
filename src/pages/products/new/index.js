import NewProducts from '../../../components/pageComponents/Products/NewProducts';
import { API } from '../../../config';

export async function getServerSideProps(context) {
  const res = await fetch(`${API}/products?order=new&pageSize=10&page=1`);
  const data = await res.json();
  const productsArrList = data.resultList;

  return {
    props: { productsArrList },
  };
}

const NewProductsPage = ({ productsArrList }) => {
  return <NewProducts products={productsArrList} />;
};

export default NewProductsPage;
