import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import Card from '../molecules/Card';
import FormTemplate from '../templates/FormTemplate';
import { ButtonAddItem } from '../components/Button/Button';
import { Heading } from '../components/Heading/Heading';
import { transferId } from '../actions/index';

const CategoryPageWrapper = styled.div`
  position: relative;
  margin: 10px auto 0 auto;
  padding: 0 20px;
  height: 100vh;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 0.1;
    `};
`;

const ButtonAddItemWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  right: 3%;
`;

const ButtonAddItemSpan = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-right: 12px;

  @media (max-width: 768px) {
    font-size: 0px;
  }
`;

const CategoryPage = ({ products, category, transformEditedId, ...props }) => {
  const { location } = props;

  //Pomocniczy kod do uzyskania ze ścieżki nazwy kategorii na której znajduje się użytkownik
  const pathName = location.pathname;
  const categoryNameFromPath = pathName.slice(12, pathName.length);

  //użycie hooka useState do obsługi NewItemProducts oraz EditForm
  const [isAvailableNewItem, setIsAvailableNewItem] = useState(false);

  const changeStatusForm = (option) => {
    if (option === 'new') {
      setIsAvailableNewItem(!isAvailableNewItem);
    } else if (option === 'edit') {
      setValueEditForm(false);
    }
  };

  // zmienna flaga, od której zależy czy zostanie uruchomiony formularz edycji
  const [flagEditForm, setValueEditForm] = useState(false);

  let idFromCard = null;

  const changeStatusEditForm = (id) => {
    setValueEditForm(!flagEditForm);
    idFromCard = Number(id);
    transformEditedId(id);
    return idFromCard;
  };

  const exitFormAfterSubmit = () => {
    setValueEditForm(false);
  };

  return (
    <CategoryPageWrapper>
      <Menu isVisible={isAvailableNewItem || flagEditForm} isNoClicked={isAvailableNewItem} />
      <Heading isVisible={isAvailableNewItem || flagEditForm}>
        Kategoria: {categoryNameFromPath}
      </Heading>
      <CardsWrapper isVisible={isAvailableNewItem || flagEditForm}>
        {products.map((product) => {
          // Aplikacja po ścieżce sprawdza w jakiej kategorii się znajdujemy
          const checkWhichCategory = categoryNameFromPath === product.categoryName;
          return (
            checkWhichCategory && (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                categoryId={product.Id}
                amount={product.amount}
                unit={product.unit}
                categoryName={categoryNameFromPath}
                isNoClicked={isAvailableNewItem}
                statusFnEditForm={() => changeStatusEditForm(product.id)}
              />
            )
          );
        })}
      </CardsWrapper>
      <ButtonAddItemWrapper isVisible={isAvailableNewItem}>
        <ButtonAddItemSpan>Dodaj produkt</ButtonAddItemSpan>
        <ButtonAddItem onClick={() => setIsAvailableNewItem(!isAvailableNewItem)}>+</ButtonAddItem>
      </ButtonAddItemWrapper>
      {/* Formularz dodawania produktu */}
      {console.log(isAvailableNewItem)};
      {isAvailableNewItem && (
        <FormTemplate
          type="add"
          deleteForm={(option) => changeStatusForm((option = 'new'))}
          categoryName={categoryNameFromPath}
        />
      )}
      {/* Formularz edycji produktu */}
      {/* do formularza chcemy przekazac propsy, które zidentyfikują dany produkt */}
      {flagEditForm && (
        <FormTemplate
          type="edit"
          editedIdProduct={idFromCard}
          deleteForm={(option) => changeStatusForm((option = 'edit'))}
          exitForm={() => exitFormAfterSubmit}
        />
      )}
    </CategoryPageWrapper>
  );
};

CategoryPage.propTypes = {
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
  transformEditedId: PropTypes.func.isRequired,
};

CategoryPage.defaultProps = {
  products: {},
  category: {},
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transformEditedId: (id) => dispatch(transferId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
