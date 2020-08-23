import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../components/Input/Input';
import { Heading } from '../components/Heading/Heading';
import { ButtonDelete, ButtonEdit } from '../components/Button/Button';
import { editProduct as editProductAction } from '../actions/index';

const StyledWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  height: 50vh;
  border: 1px solid gray;
  background-color: whitesmoke;
  z-index: 10;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: left;
  padding-top: 20px;
  height: 100%;

  label {
    padding-top: 10px;
    transform: translateX(100px);

    select {
      display: block;
      padding: 3px;
      margin-top: 5px;
      border-radius: 10px;
    }
  }
  label:first-of-type {
    padding-top: 50px;
  }
`;

const StyledHeadingForm = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.normal};
`;

const EditBtn = styled(ButtonEdit)`
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
`;

const EditForm = ({ deleteButton, products, editedIdProduct, exitForm, editProduct }) => {
  const [valueAmount, setValueAmount] = useState(products[editedIdProduct - 1].amount);
  const [valueUnit, setValueUnit] = useState(products[editedIdProduct - 1].unit);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct({
      id: editedIdProduct,
      amount: valueAmount,
      unit: valueUnit,
    });

    //zamknięcie formularza po submit
    exitForm();
  };

  const handleChange = (e) => {
    e.target.name === 'amount' && setValueAmount(e.target.value);
    e.target.name === 'unit' && setValueUnit(e.target.value);
  };

  //wyłapiemy z porónania statu z propsem z CategoryPage nazwę edytowalnego produktu

  const name = products.map((product) => {
    if (product.id === editedIdProduct) {
      return product.name;
    }
  });

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <ButtonDelete onClick={() => deleteButton()}>x</ButtonDelete>
        <StyledHeadingForm>Edytuj: {name}</StyledHeadingForm>

        <label htmlFor="amount">
          Ilość: <br />
          <Input type="number" name="amount" value={valueAmount} onChange={handleChange} />
        </label>
        <label name="unit">
          Jednostka:
          <select name="unit" onChange={handleChange} value={valueUnit}>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="szt">szt.</option>
            <option value="rol">rol.</option>
          </select>
        </label>
        <EditBtn>Edytuj</EditBtn>
      </StyledForm>
    </StyledWrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
    editedIdProduct: state.editedIdProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (values) => dispatch(editProductAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
