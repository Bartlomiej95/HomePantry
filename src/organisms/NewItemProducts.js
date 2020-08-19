import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addProductAction } from '../actions/index';
import { Input } from '../components/Input/Input';
import { Heading } from '../components/Heading/Heading';
import { ButtonDelete } from '../components/Button/Button';

const StyledWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  height: 80vh;
  border: 1px solid gray;
  background-color: whitesmoke;
  z-index: 10;
`;

const StyledHeadingForm = styled(Heading)`
  margin-top: 10px;
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 20px;
`;

const NewItemProducts = ({ addProduct, categoryName, products, deleteButton }) => {
  const [valueNameProduct, setValueName] = useState('');
  const [valueAmount, setValueAmount] = useState(0);
  const [valueUnit, setValueUnit] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    e.target.name === 'name' && setValueName(e.target.value);
    e.target.name === 'amount' && setValueAmount(e.target.value);
    e.target.name === 'unit' && setValueUnit(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      id: checkFirstAvailableId(),
      name: valueNameProduct,
      amount: valueAmount,
      unit: valueUnit,
      categoryName: categoryName,
      limit: 0,
    });
  };

  //Funkcja przypisująca odpowiednie ID do nowego elementu
  //Sprawdzamy czy dotychczasowe produkty mają id = kolejnej liczbie naturalnej, jeżeli jakiejś liczby brakuje, to ją zwracamy.
  const checkFirstAvailableId = () => {
    let newFreeAvailableId = 0;
    for (let i = 1; i < products.length; i++) {
      if (products[i].id !== products[i - 1].id + 1 && i !== 0) {
        return (newFreeAvailableId = products[i - 1].id + 1);
      }
    }
    newFreeAvailableId = newFreeAvailableId === 0 ? products.length + 1 : newFreeAvailableId;
    return newFreeAvailableId;
  };

  return (
    <StyledWrapper onClick={checkFirstAvailableId}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeadingForm>Formularz - dodaj nowy produkt </StyledHeadingForm>
        <label htmlFor="name">
          Nazwa produktu <br />
          <Input type="text" name="name" onChange={handleChange} value={valueNameProduct} />
        </label>
        <label htmlFor="amount">
          Ilość: <br />
          <Input type="number" name="amount" onChange={handleChange} value={valueAmount} />
        </label>
        <label>
          Jednostka: <br />
          <select name="unit" onChange={handleChange} value={valueUnit}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="szt">szt.</option>
            <option value="rol">rol.</option>
          </select>
        </label>
        <button type="submit" value="Dodaj">
          Dodaj produkt
        </button>
      </StyledForm>
      <ButtonDelete onClick={deleteButton}>x</ButtonDelete>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (valuesProduct) => dispatch(addProductAction(valuesProduct)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItemProducts);
