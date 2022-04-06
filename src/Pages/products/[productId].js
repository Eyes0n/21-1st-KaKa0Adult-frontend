import Detail from '../../components/pageComponents/Detail';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/data/detailProducts.json');
  const data = await res.json();

  const paths = data.map((product) => ({
    params: { productId: String(product.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    // `http://localhost:3000/data/detailProducts/${params.productId}`,
    `http://localhost:3000/data/detailProduct.json`,
  );
  const productInfo = await res.json();

  return {
    props: { productInfo },
  };
}

const DetailProductPage = ({ productInfo }) => {
  return <Detail productInfo={productInfo} />;
};

export default DetailProductPage;
