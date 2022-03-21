import GridItem from '../GridItem';
import styles from './index.module.scss';

const GridItemList = ({ oddOrEven, items, addToCart, toggleProductLike }) => {
  const gridStyles =
    oddOrEven === 'odd' ? styles.gridSectionOdd : styles.gridSectionEven;

  return (
    <div className={gridStyles}>
      {items.map((item) => (
        <GridItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          toggleProductLike={toggleProductLike}
        />
      ))}
    </div>
  );
};

export default GridItemList;
