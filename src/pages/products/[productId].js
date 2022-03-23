import Detail from '../../components/pageComponents/Detail';
import { API } from '../../config';

export async function getStaticPaths() {
  const res = await fetch(`${API}/products`);
  const json = await res.json();
  const data = json.resultList;
  const paths = data.map((product) => ({
    params: { productId: String(product.id) },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { productId },
  } = context;

  const res = await fetch(`${API}/product/${Number(productId)}`);
  const data = await res.json();
  const productInfo = data.result;

  return {
    props: { productInfo },
  };
}

const DetailProductPage = ({ productInfo }) => {
  return <Detail productInfo={productInfo} />;
};

export default DetailProductPage;
