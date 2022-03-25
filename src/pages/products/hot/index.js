import HotProducts from '../../../components/pageComponents/Products/HotProducts';
import { API } from '../../../config';
import divideArrByNumber from '../../../utils/divideArrByNumber';

export async function getServerSideProps(context) {
  const res = await fetch(`${API}/products?order=hot&pageSize=18&page=1`);
  const data = await res.json();
  // products : [{}, {}, ...]
  const products = data.resultList;
  const totalPageCount = data.totalPageCount;

  // 그리드당 9개 데이터 사용 -> 데이터 9개씩 짤라줘야함
  // dividedListByNine : [ [{}, {}, ...], [], [], ... ]
  const dividedListByNine = divideArrByNumber(products, 9);

  return {
    props: { productArr: dividedListByNine, totalPages: totalPageCount },
  };
}

const HotProductsPage = ({ productArr, totalPages }) => {
  return <HotProducts productArr={productArr} totalPages={totalPages} />;
};

export default HotProductsPage;
