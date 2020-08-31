import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import { SearchInput } from '../components/Input/Input';
import { UlElementList as WrapperList } from '../components/List/List';
import { LiElementList } from '../components/List/List';
import { Heading } from '../components/Heading/Heading';

const WrapperShoppingList = styled.div`
  margin-left: 20px;
  margin: 40px 0 0 20px;
`;

const HeadingStyled = styled(Heading)`
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 160px;
  }
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

const WrapperSearch = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
`;

const ShoppingList = ({ products }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleClick = (e) => {
    if (e.target.style.textDecoration === 'line-through') {
      e.target.style.textDecoration = 'none';
    } else {
      e.target.style.textDecoration = 'line-through';
    }
  };

  const productsFromShoppingList = products
    .map((product) => {
      if (product.amount <= product.limit) {
        return product.name;
      }
    })
    .filter(Boolean);

  //obsługa zdarzenia w polu szukaj

  const handleChange = (e) => {
    console.log(e.target.value.toLowerCase());
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Menu />
      <WrapperShoppingList>
        <HeadingStyled> Lista zakupów </HeadingStyled>
        <WrapperSearch>
          <SearchInput
            placeholder="Znajdź"
            value={searchValue}
            onChange={(e) => handleChange(e, productsFromShoppingList)}
          />
        </WrapperSearch>

        <WrapperList>
          {products.map(
            (product) =>
              product.amount <= product.limit && (
                <Product key={product.id} id={product.id} onClick={(e) => handleClick(e)}>
                  {product.name.toLowerCase().includes(searchValue.toLowerCase()) && product.name}
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
