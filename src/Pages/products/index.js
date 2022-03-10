import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HotProducts from '../../components/Next/HotProducts';
import NewProducts from '../../components/Next/NewProducts';
import { fetchGet } from '../../utils/fetches';
import { PRODUCT_API } from '../../config';
import NewProductsGridLayout from '../../components/Next/Layout/NewProductsGridLayout';
import HotProductsGridLayout from '../../components/Next/Layout/HotProductsGridLayout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { tab } = router.query; // products?tab=new || tab=hot

  useEffect(() => {
    // fetchGet(`${PRODUCT_API}/products?tab=${tab}`)
    fetch(`/api/products?tab=${tab}`)
      .then((res) => res.json())
      .then((products) => {
        setProducts(products.resultList);
      });
  }, [tab]);

  const renderHot_Or_New = () => {
    if (tab === 'new')
      return (
        <NewProductsGridLayout>
          <NewProducts items={products} />
        </NewProductsGridLayout>
      );
    if (tab === 'hot')
      return (
        <HotProductsGridLayout>
          <HotProducts items={products} />
        </HotProductsGridLayout>
      );
  };

  return (
    <div>
      <div>Products</div>
      <Link href="/">
        <a>Home Link</a>
      </Link>
      <br />
      <Link href="/products?tab=new">
        <a>new products Link</a>
      </Link>
      <br />
      <Link href="/products?tab=hot">
        <a>hot products Link</a>
      </Link>

      {/* MainTab */}

      <div>{renderHot_Or_New()}</div>
      {/* new */}
      {/* Carousel */}
      {/* <ProductList /> */}

      {/* hot */}
      {/* ProductList */}

      {/* Footer */}
    </div>
  );
};

export default Products;
