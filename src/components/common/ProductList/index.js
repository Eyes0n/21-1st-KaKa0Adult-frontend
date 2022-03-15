import Product from '../Product';
import { useProduct } from '../../../hooks/useProduct';
import styles from './index.module.scss';

const ProductList = ({ products }) => {
  const [dataList, toggleProductLike, addToCart] = useProduct(products);

  return (
    <div className={styles.ProductWrap}>
      <ul className={styles.itemUl}>
        {dataList?.map((product, i) => (
          <li className={styles.itemLi} key={product.id}>
            <Product
              index={i}
              product={product}
              addToCart={addToCart}
              toggleProductLike={toggleProductLike}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
