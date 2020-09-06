import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import Category from '../molecules/Category';

const WrapperCategories = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
`;

const HomePantry = ({ category }) => (
  <div>
    <Menu />
    <WrapperCategories>
      {category.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          title={category.title}
          name={category.name}
          icon={category.icon}
          itemColor={category.color}
        />
      ))}
    </WrapperCategories>
  </div>
);

HomePantry.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.oneOf([
      'Napoje',
      'Artykuły spożywcze',
      'Pieczywo',
      'Kosemtyki',
      'Owoce i warzywa',
      'Dla zwierząt',
    ]),
    name: PropTypes.oneOf(['animals', 'fruits', 'cosmetics', 'breads', 'groceries', 'drinks']),
    icon: PropTypes.oneOf([
      '/Category/drink.png',
      '/Category/groceries.png',
      '/Category/breads.png',
      '/Category/cosmetics.png',
      '/Category/fruit.png',
      '/Category/animals.png',
    ]),
  }),
};

HomePantry.defaultProps = {
  category: {},
};

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

export default connect(mapStateToProps)(HomePantry);
