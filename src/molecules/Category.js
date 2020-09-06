import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Heading, CategoryHeading } from '../components/Heading/Heading';

const transformCategories = keyframes`
  0% {
     transform: scale(0,0)
   }
   25% {
     transform: scale(0.4, 0.4);
   }
   50% {
      transform: scale(0.7, 0.7);
   }
   100% {
     transform: scale(1,1);
   }
 `;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  width: ${({ theme }) => theme.size.widthCategory};
  height: ${({ theme }) => theme.size.heightCategory};
  margin: 12px auto;
  padding: 0 10px;
  border: 1px gray solid;
  border-radius: 50px;
  box-shadow: 0px 6px 5px 0px rgba(173, 164, 184, 0.53);
  background-color: transparent;
  cursor: pointer;
  animation: ${transformCategories} 0.4s both;

  &:hover {
    box-shadow: 0px 6px 5px 0px ${({ theme }) => theme.backgroundColor.second};
  }

  @media (max-width: 374px) {
  }

  @media (max-width: 768px) and (min-width: 375px) {
    padding: 0 20px;
  }
`;

const LpHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  padding: 0 10px;
  margin-right: 15px;

  @media (max-width: 374px) {
    display: none;
  }

  @media (max-width: 768px) and (min-width: 375px) {
    display: none;
  }
`;

const ImageCategory = styled.img`
  max-width: 70%;
  max-height: 70%;
  margin-right: 20px;

  @media (max-width: 374px) {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }

  @media (max-width: 768px) and (min-width: 375px) {
    width: 38px;
    height: 38px;
  }
`;

const Category = ({ title, name, id, icon }) => {
  const [isCategoryClicked, setCategoryClicked] = useState(false);

  if (isCategoryClicked) {
    return <Redirect to={`/homepantry/${name}`} />;
  }

  return (
    <CategoryWrapper onClick={() => setCategoryClicked(!isCategoryClicked)}>
      <LpHeading>{id}</LpHeading>
      <ImageCategory src={icon} />
      <CategoryHeading>{title}</CategoryHeading>
    </CategoryWrapper>
  );
};

Category.propTypes = {
  id: PropTypes.number.isRequired,
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
};

Category.defaultProps = {
  title: 'Tytuł kategorii',
  name: '',
  icon: '',
};

export default Category;
