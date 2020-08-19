import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import SearchField from '../molecules/SearchField';
import { UlElementList as WrapperList } from '../components/List/List';
import { LiElementList } from '../components/List/List';
import { Heading } from '../components/Heading/Heading';

const WrapperShoppingList = styled.div`
  margin-left: 20px;
  margin: 40px 0 0 20px;
`;

const Product = styled(LiElementList)`
  width: 50vw;
  border: 1px solid gray;
  padding-left: 20px;

  &:nth-child(2n) {
    background-color: #ffffe0;
  }
  &:nth-child(2n + 1) {
    background-color: #daeefe;
  }
`;

const ShoppingList = ({ products }) => {
  const handleClick = (e) => {
    if (e.target.style.textDecoration === 'line-through') {
      e.target.style.textDecoration = 'none';
    } else {
      e.target.style.textDecoration = 'line-through';
    }
  };

  return (
    <div>
      <Menu />
      <WrapperShoppingList>
        <Heading> Lista zakupów </Heading>
        <SearchField />
        <WrapperList>
          {products.map(
            (product) =>
              product.amount <= product.limit && (
                <Product key={product.id} id={product.id} onClick={(e) => handleClick(e)}>
                  {product.name}
                </Product>
              ),
          )}
        </WrapperList>
      </WrapperShoppingList>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ShoppingList);
