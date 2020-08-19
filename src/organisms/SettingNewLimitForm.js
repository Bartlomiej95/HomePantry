import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Heading } from '../components/Heading/Heading';
import { setLimitAction } from '../actions/index';
import { Input } from '../components/Input/Input';
import { ButtonDelete, ButtonEdit } from '../components/Button/Button';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 60%;
  height: 40vh;
  width: 40vw;
  transform: translate(-50%, -50%);
  text-align: center;
  border: 1px solid gray;
  background-color: whitesmoke;
  z-index: 10;

  select {
    width: 40%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  height: 100%;
`;

const FormHeading = styled(Heading)`
  margin-bottom: 30px;
`;

const BtnEdit = styled(ButtonEdit)`
  flex-shrink: 3;
  justify-self: end;
`;

const SettingNewLimitForm = ({ products, deleteLimitForm, setLimit }) => {
  const [valueId, setValueId] = useState(0);
  const [valueLimit, setValueLimit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLimit(Number(valueId), Number(valueLimit));
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    e.target.name === 'limit' && setValueLimit(e.target.value);
    e.target.name === 'id' && setValueId(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <FormHeading> Wybierz produkt i podaj nowy limit </FormHeading>
        <select value={Number(valueId)} name="id" onChange={handleChange}>
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor="limit">
          <Input type="number" name="limit" onChange={handleChange} value={valueLimit} />{' '}
        </label>
        <ButtonEdit type="submit" value="Ustaw">
          Ustaw limit
        </ButtonEdit>
      </StyledForm>
      <ButtonDelete onClick={deleteLimitForm}> x </ButtonDelete>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //robimy setLimit która jest callbackiem, który wysyła akcje
    setLimit: (id, valueOfLimit) => dispatch(setLimitAction(id, valueOfLimit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingNewLimitForm);
