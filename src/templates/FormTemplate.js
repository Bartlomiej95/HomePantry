import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addProductAction,
  setLimitAction,
  editProduct as editProductAction,
} from '../actions/index';
import { Heading } from '../components/Heading/Heading';
import { Input } from '../components/Input/Input';
import { ButtonDelete, ButtonEdit } from '../components/Button/Button';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 50vh;
  width: 40vw;
  transform: translate(-50%, -50%);
  text-align: center;
  border: 1px solid gray;
  background-color: whitesmoke;
  z-index: 10;

  @media (max-width: 374px) {
    width: 80vw;
    height: 80vh;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media (min-width: 769px) {
    width: 500px;
  }
`;

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 374px) {
    width: 95%;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    width: 90%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
  }
`;

const FormHeading = styled(Heading)`
  margin-bottom: 30px;
`;

const FormMainFields = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;

  @media (max-width: 374px) {
    width: 100%;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 95%;
  }
  label {
    margin-top: 10px;
  }
`;

const BtnEdit = styled(ButtonEdit)`
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  font-size: ${({ theme }) => theme.fontSize.normal};
  height: 30px;

  @media (max-width: 374px) {
    font-size: ${({ theme }) => theme.fontSize.medium};
    height: 30px;
  }

  @media (min-width: 374px) and (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.medium};
    height: 30px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: ${({ theme }) => theme.fontSize.medium};
    height: 30px;
    width: 45%;
  }
`;

const FormTemplate = ({
  type,
  products,
  categoryName,
  editedIdProduct,
  deleteForm,
  addProduct,
  setLimit,
  editProduct,
}) => {
  const [valueId, setValueId] = useState(0);
  const [valueLimit, setValueLimit] = useState(0);
  const [valueNameProduct, setValueName] = useState('');
  const [valueAmount, setValueAmount] = useState(0);
  const [valueUnit, setValueUnit] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name);
    e.target.name === 'limit' && setValueLimit(e.target.value);
    e.target.name === 'id' && setValueId(e.target.value);
    e.target.name === 'name' && setValueName(e.target.value);
    e.target.name === 'amount' && setValueAmount(e.target.value);
    e.target.name === 'unit' && setValueUnit(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    type === 'set' && setLimit(Number(valueId), Number(valueLimit));
    type === 'add' &&
      addProduct({
        id: checkFirstAvailableId(),
        name: valueNameProduct,
        amount: valueAmount,
        unit: valueUnit,
        categoryName: categoryName,
        limit: 0,
      });
    type === 'edit' &&
      editProduct({
        id: editedIdProduct,
        amount: valueAmount,
        unit: valueUnit,
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

  const name = products.map((product) => {
    if (product.id === editedIdProduct) {
      return product.name;
    }
  });

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        {type === 'set' && <FormHeading> Wybierz produkt i podaj nowy limit</FormHeading>}
        {type === 'add' && <FormHeading> Formularz - dodaj nowy produkt</FormHeading>}
        {type === 'edit' && <FormHeading> Edytuj {name} </FormHeading>}

        <FormMainFields>
          {/* W przypadku gdy chcemy formularz ustawienia nowego limitu */}
          {type === 'set' && (
            <>
              <label>
                Nazwa <br />
                <select value={Number(valueId)} name="id" onChange={handleChange}>
                  {products.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="limit">
                Nowy limit: <br />
                <Input type="number" name="limit" onChange={handleChange} value={valueLimit} />{' '}
              </label>
            </>
          )}

          {/* Formularz dodawania nowego produktu */}
          {type === 'add' && (
            <>
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
            </>
          )}

          {/* Formularz edycji produktu */}
          {type === 'edit' && (
            <>
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
            </>
          )}
        </FormMainFields>
        {type === 'set' && (
          <BtnEdit type="submit" value="Ustaw">
            Ustaw limit
          </BtnEdit>
        )}
        {type === 'add' && (
          <BtnEdit type="submit" value="Dodaj">
            Dodaj produkt
          </BtnEdit>
        )}
        {type === 'edit' && <BtnEdit>Edytuj</BtnEdit>}
      </StyledForm>
      <ButtonDelete onClick={deleteForm}> x </ButtonDelete>
    </Wrapper>
  );
};

FormTemplate.propTypes = {
  type: PropTypes.oneOf(['set', 'add', 'edit']).isRequired,
  products: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    categoryName: PropTypes.oneOf([
      'drinks',
      'animals',
      'fruits',
      'cosmetics',
      'groceries',
      'breads',
    ]),
    categoryId: PropTypes.number,
    amount: PropTypes.number,
    unit: PropTypes.string,
    limit: PropTypes.number,
  }),
  categoryName: PropTypes.oneOf(['drinks', 'animals', 'fruits', 'cosmetics', 'groceries', 'breads'])
    .isRequired,
  editedIdProduct: PropTypes.number.isRequired,
  deleteForm: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};

FormTemplate.defaultProps = {
  products: {},
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    editedIdProduct: state.editedIdProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (valuesProduct) => dispatch(addProductAction(valuesProduct)),
    //robimy setLimit która jest, który wysyła akcje
    setLimit: (id, valueOfLimit) => dispatch(setLimitAction(id, valueOfLimit)),
    editProduct: (values) => dispatch(editProductAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTemplate);
