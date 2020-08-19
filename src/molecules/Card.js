import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeProductAction } from '../actions/index';
import { Button, ButtonEdit, ButtonDelete } from '../components/Button/Button';
import { Heading, CategoryHeading } from '../components/Heading/Heading';

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ theme }) => theme.size.heightCard};
  width: ${({ theme }) => theme.size.widthCard};
  margin: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 6px 5px 0px rgba(173, 164, 184, 0.53);

  @media (max-width: 374px) {
    width: ${({ theme }) => theme.size.mobileWidthCard};
    height: ${({ theme }) => theme.size.mobileHeightCard};
  }
`;

const CardHeadingWrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.main};
  height: 3rem;
`;

const CardContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  position: relative;
  padding: 5px;
  width: ${({ theme }) => theme.size.widthCard};

  @media (max-width: 374px) {
    width: ${({ theme }) => theme.size.mobileWidthCard};
  }
`;

const DivImg = styled.img`
  height: 30px;
  width: 30px;

  @media (max-width: 374px) {
    height: 25px;
    width: 25px;
  }
`;

const ProductNameHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.normal};
  padding: 0 10px;
  flex-grow: 2;

  @media (max-width: 374px) {
    display: none;
  }
`;

const ProductAmountHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.normal};
  padding: 0 10px;
  flex-grow: 2;

  @media (max-width: 374px) {
  }
`;

const ButtonDeleteCard = styled(ButtonDelete)`
  top: 0%;
  right: 0%;
`;

const Card = ({
  id,
  name,
  categoryId,
  amount,
  unit,
  categoryName,
  removeProduct,
  category,
  isNoClicked,
  statusFnEditForm,
  ...props
}) => {
  const chooseCategory = category.filter((category) => category.name === categoryName);
  const iconCategory = chooseCategory[0].icon;

  const afterEditClick = () => {
    statusFnEditForm(id);
  };

  return (
    <CardWrapper>
      <CardHeadingWrapper>
        <CategoryHeading>{name}</CategoryHeading>
      </CardHeadingWrapper>

      <CardContentWrapper>
        <DivImg src={iconCategory}></DivImg>
        <ProductNameHeading>{name}</ProductNameHeading>
        <ProductAmountHeading>{`${amount}${unit}`}</ProductAmountHeading>
      </CardContentWrapper>
      {/* Klik wskazuje na funkcje statusEditForm z rodzica CategoryPage. Tam  */}
      <ButtonEdit disabled={isNoClicked} onClick={afterEditClick}>
        Edytuj
      </ButtonEdit>
      <ButtonDelete onClick={() => removeProduct(id)} disabled={isNoClicked}>
        x
      </ButtonDelete>
    </CardWrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (id) => dispatch(removeProductAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
