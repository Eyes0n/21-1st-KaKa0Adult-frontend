import Product from '../Product';
import styles from './index.module.scss';

const ProductList = ({ productsList, toggleProductLike, addToCart }) => {
  return (
    <div className={styles.ProductWrap}>
      <ul className={styles.itemUl}>
        {productsList?.map((products) =>
          products.map((product, i) => (
            <li className={styles.itemLi} key={product.id}>
              <Product
                index={i}
                product={product}
                addToCart={addToCart}
                toggleProductLike={toggleProductLike}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
