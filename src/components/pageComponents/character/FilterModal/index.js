import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const FilterModal = ({ filters, toggleFilterModal, selectFilterCheck }) => {
  const [isSlide, setIsSlide] = useState(false);

  useEffect(() => {
    setIsSlide(true);
  }, []);

  return (
    <div
      className={
        isSlide
          ? `${styles.filterModalWrap} ${styles.dim}`
          : styles.filterModalWrap
      }
      onClick={toggleFilterModal}
    >
      <div className={styles.filterModal}>
        <ul className={styles.filterUl}>
          {filters.map((filter, idx) => (
            <li
              className={styles.filterLi}
              key={filter.name}
              id={idx}
              onClick={() => selectFilterCheck(idx, filter.name)}
            >
              <div className={styles.fileterModalLink}>
                {filter.name}
                {filter.isCheck && (
                  <img
                    src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/colorcheck.png"
                    alt="check"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterModal;
