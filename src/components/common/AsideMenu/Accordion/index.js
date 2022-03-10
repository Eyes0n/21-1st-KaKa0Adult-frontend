import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class Accordion extends Component {
  constructor() {
    super();
    this.state = { isShowList: false };
  }

  toggleList = () => {
    const { isShowList } = this.state;
    this.setState({ isShowList: !isShowList });
  };

  render() {
    const { isShowList } = this.state;
    const { type, title, characters, categories } = this.props;

    return (
      <>
        <button className="accordionBtn" onClick={this.toggleList}>
          {title}
          <span className={`arrow ${isShowList && 'rotate'}`}></span>
        </button>
        {isShowList &&
          (type === 'character' ? (
            <ul className="characters">
              {characters.length &&
                characters.map((character) => (
                  <li key={character.id} className="characterItem">
                    <Link
                      to={`/products/character/${character.name}`}
                      className="characterLink"
                    >
                      <div className="character">
                        <img
                          className="characterImg"
                          src="https://jotasic.github.io/21-kaka0-pet-shop-images/images/PetCharacter.png"
                          alt={character.name}
                        />
                        <span className="characterSpan">{character.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <ul className="category">
              {categories?.map((category) => (
                <li key={category.id} className="categoryItem">
                  <Link to={`/products/category`} className="categoryLink">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
      </>
    );
  }
}

export default Accordion;
