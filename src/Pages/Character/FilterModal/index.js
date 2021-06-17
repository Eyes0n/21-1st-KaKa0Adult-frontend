import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        className={isSlide ? 'filterModalWrap dim' : 'filterModalWrap'}
        onClick={toggleFilterModal}
      >
        <div className="filterModal">
          <ul className="filterUl">
            {filters.map((filter, idx) => (
              <li
                className="filterLi"
                key={filter.name}
                id={idx}
                onClick={() => toggleFilterCheck(idx)}
              >
                <Link
                  to={`/products/character/type=character?search=${filter.name}`}
                  className="fileterModalLink"
                >
                  {filter.name}
                  {filter.isCheck && (
                    <img src="/images/colorCheck.png" alt="check" />
                  )}
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
