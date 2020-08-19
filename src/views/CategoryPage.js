import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import Card from '../molecules/Card';
import EditForm from '../organisms/EditForm';
import NewItemProducts from '../organisms/NewItemProducts';
import { ButtonAddItem } from '../components/Button/Button';
import { Heading } from '../components/Heading/Heading';
import { transformId, transferId } from '../actions/index';

const CategoryPageWrapper = styled.div`
  position: relative;
  margin: 10px auto 0 auto;
  padding: 0 20px;
  height: 100vh;
`;

const CardsWrapper = styled.div`
  /* display: grid;
  grid-template-columns: repeat(3, 3fr);
  column-gap: 40px;
  justify-items: center;
  margin-top: 10px; */
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

  let idFromCard = 111;

  const changeStatusEditForm = (id) => {
    setValueEditForm(!flagEditForm);
    idFromCard = Number(id);
    transformEditedId(id);
    console.log(`IDfromCArd ${idFromCard}`);
    return idFromCard;
  };

  const exitFormAfterSubmit = () => {
    setValueEditForm(false);
  };

  return (
    <CategoryPageWrapper>
      <Menu isVisible={isAvailableNewItem} isNoClicked={isAvailableNewItem} />
      <Heading isVisible={isAvailableNewItem}>Kategoria: {categoryNameFromPath}</Heading>
      <CardsWrapper isVisible={isAvailableNewItem}>
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
                statusFnEditForm={(idFromCard) => changeStatusEditForm(idFromCard)}
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
        <NewItemProducts
          deleteButton={(option) => changeStatusForm((option = 'new'))}
          categoryName={categoryNameFromPath}
        />
      )}
      {/* Formularz edycji produktu */}
      {/* do formularza chcemy przekazac propsy, które zidentyfikują dany produkt */}
      {flagEditForm && (
        <EditForm
          idEditedProduct={idFromCard}
          deleteButton={(option) => changeStatusForm((option = 'edit'))}
          exitForm={() => exitFormAfterSubmit}
        ></EditForm>
      )}
    </CategoryPageWrapper>
  );
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
