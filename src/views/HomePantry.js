import React from 'react';
import styled, { keyframes } from 'styled-components';
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

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

export default connect(mapStateToProps)(HomePantry);
