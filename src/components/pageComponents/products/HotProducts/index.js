import { useState, useCallback, useMemo, useEffect } from 'react';
import { API, PRODUCT_API } from '../../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../../utils/fetches';
import HotGridLayout from './HotGridLayout';
import GridItemList from './GridItemList';
import useProduct from '../../../../hooks/useProduct';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import divideArrByNumber from '../../../../utils/divideArrByNumber';

const PAGE_SIZE = 18;

const HotProducts = ({ productArr, totalPages }) => {
  // productArr : [ [{}, {}, ...] ]
  const [productsList, setProductsList] = useState(productArr);
  const [page, setPage] = useState(1);
  const totalPageCount = useMemo(() => totalPages, [totalPages]);

  const fetcher = useCallback(async () => {
    if (page > totalPageCount) return;

    const res = await fetchGet(
      `${API}/products?order=hot&pageSize=${PAGE_SIZE}&page=${page}`
    );

    if (res.status === 204) return;

    const data = await res.json();
    // products : [{}, {},....]
    const products = data.resultList;
    // dividedListByNine : [[{}, {},....], [], [], ...]
    const dividedListByNine = divideArrByNumber(products, 9);

    page !== 1 && setProductsList((prev) => [...prev, ...dividedListByNine]);
    setPage((prev) => prev + 1);
  }, [page, totalPageCount]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetcher, 800);

  const [productsArrList, toggleProductLike, addToCart] =
    useProduct(productsList);

  return (
    <>
      <HotGridLayout>
        {productsArrList?.map((products, idx) => (
          <GridItemList
            key={idx}
            oddOrEven={(idx + 1) % 2 === 0 ? 'even' : 'odd'}
            items={products}
            addToCart={addToCart}
            toggleProductLike={toggleProductLike}
          />
        ))}
      </HotGridLayout>
      {isFetching && <p>loading more products</p>}
    </>
  );
};

export default HotProducts;
