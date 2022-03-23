import NewProducts from '../../../components/pageComponents/Products/NewProducts';
import { API } from '../../../config';

export async function getServerSideProps(context) {
  const res = await fetch(`${API}/products?order=new&pageSize=10&page=1`);
  const data = await res.json();
  const productList = data.resultList;
  const totalPages = data.totalPageCount;

  return {
    props: { productList, totalPages },
  };
}

const NewProductsPage = ({ productList, totalPages }) => {
  return <NewProducts productArr={productList} totalPages={totalPages} />;
};

export default NewProductsPage;
