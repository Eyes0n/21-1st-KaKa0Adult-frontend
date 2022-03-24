import { useState, useEffect } from 'react';
import Nav from '../../../common/Nav';
import MainTab from '../../../common/MainTab';
import { API, PRODUCT_API } from '../../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import styles from './index.module.scss';
import HotGridLayout from './HotGridLayout';
import GridItemList from './GridItemList';
import { useProduct } from '../../../../hooks/useProduct';

const HotProducts = ({ products }) => {
  // 그리드당 9개 데이터 사용 -> 데이터 9개씩 짤라줘야함
  const copyProducts = [...products];
  const dividedListByNine = [];

  const num =
    copyProducts.length % 9 === 0
      ? copyProducts.length / 9
      : Math.floor(copyProducts.length / 9) + 1;

  for (let i = 0; i < num; i++) {
    dividedListByNine[i] = copyProducts.splice(0, 9);
  }

  // productsList : [[{}, {},....], [], [], ...]
  const [productsArrList, setProductsArrList] = useState([
    ...dividedListByNine,
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) return;
    fetchGet(`${PRODUCT_API}/products?order=hot&pageSize=16&page=${page}`).then(
      (result) => setProductsArrList((prev) => [...prev, result.resultList])
    );
  }, [page]);

  const [productsList, toggleProductLike, addToCart] =
    useProduct(productsArrList);

  return (
    <>
      <HotGridLayout>
        {productsList?.map((products, idx) => (
          <GridItemList
            key={idx}
            oddOrEven={(idx + 1) % 2 === 0 ? 'even' : 'odd'}
            items={products}
            addToCart={addToCart}
            toggleProductLike={toggleProductLike}
          />
        ))}
      </HotGridLayout>
    </>
  );
};

export default HotProducts;
