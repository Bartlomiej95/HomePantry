import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SearchInput } from '../components/Input/Input';
import { searchProduct } from '../actions/index';

const WrapperSearch = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
`;

const SearchField = ({ products, searchItem }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    searchItem(e.target.value);
  };

  return (
    <WrapperSearch>
      <SearchInput placeholder="Znajdź" value={searchValue} onChange={(e) => handleChange(e)} />
    </WrapperSearch>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchItem: (text) => dispatch(searchProduct(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
