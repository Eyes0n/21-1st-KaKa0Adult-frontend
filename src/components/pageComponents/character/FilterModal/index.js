import React, { Component } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

class FilterModal extends Component {
  constructor() {
    super();
    this.state = {
      isSlide: false,
    };
  }

  componentDidMount() {
    const { isSlide } = this.state;
    this.setState({ isSlide: !isSlide });
  }

  render() {
    const { isSlide } = this.state;
    const { filters, toggleFilterModal, toggleFilterCheck } = this.props;

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
                onClick={() => toggleFilterCheck(idx)}
              >
                <Link
                  href={`/products/character?category=character&search=${filter.name}&page=1&pageSize=10`}
                >
                  <a className={styles.fileterModalLink}>
                    {filter.name}
                    {filter.isCheck && (
                      <img
                        src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/colorcheck.png"
                        alt="check"
                      />
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterModal;
