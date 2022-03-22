import NewProducts from '../../../components/pageComponents/Products/NewProducts';

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/data/newProductsData.json');
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
