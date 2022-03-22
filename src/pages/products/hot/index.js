import HotProducts from '../../../components/pageComponents/Products/HotProducts';

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/data/hotProductsData.json');
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
