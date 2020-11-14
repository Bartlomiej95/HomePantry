import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProductAction } from '../actions/index';
import { ButtonEdit, ButtonDelete } from '../components/Button/Button';
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

const DivImg = styled.div`
  height: 30px;
  width: 30px;

  img{
    max-width: 100%;
    max-height: 100%;
  }

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
  console.log(iconCategory);

  const afterEditClick = () => {
    statusFnEditForm(id);
  };
  return (
    <CardWrapper>
      <CardHeadingWrapper>
        <CategoryHeading>{name}</CategoryHeading>
      </CardHeadingWrapper>

      <CardContentWrapper>
        <DivImg >
          <img src={`../${iconCategory}`} alt="produkt" />
        </DivImg>
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
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  categoryId: PropTypes.number,
  amount: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(['kg', 'l', 'g', 'szt.', 'rol.']).isRequired,
  categoryName: PropTypes.oneOf(['groceries', 'drinks', 'breads', 'animals', 'cosmetics', 'fruits'])
    .isRequired,
  removeProduct: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.oneOf([
      'Category/drink.png',
      'Category/groceries.png',
      'Category/breads.png',
      'Category/cosmetics.png',
      'Category/fruit.png',
      'Category/animals.png',
    ]),
  }),
  isNoClicked: PropTypes.bool,
  statusFnEditForm: PropTypes.func.isRequired,
};

Card.defaultProps = {
  categoryId: 0,
  category: [],
  isNoClicked: false,
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
