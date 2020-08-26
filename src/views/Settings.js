import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../organisms/Menu';
import FormTemplate from '../templates/FormTemplate';
import { Heading } from '../components/Heading/Heading';
import { ButtonAddItem } from '../components/Button/Button';
import { ParagraphLimit, ParagraphLimitAmount } from '../components/Paragraph/Paragraph';

const WrapperSettings = styled.div`
  margin: 40px 0 0 20px;

  span {
    display: block;
    /* text-align: center; */
    margin: 20px auto 50px auto;
    padding-left: 20px;
    font-size: ${({ theme }) => theme.fontSize.normal};
  }
`;

const WrapperLimits = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Limit = styled.li`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  list-style-type: none;
  font-size: ${({ theme }) => theme.fontSize.normal};
  padding: 0 auto 10px auto;
  margin: 10px;
  flex-basis: 30%;
  height: 50px;
  line-height: 50px;
  border-radius: 20px;
  box-shadow: 0px 6px 5px 0px rgba(173, 164, 184, 0.53);

  @media (max-width: 374px) {
    flex-basis: 42%;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    flex-basis: 42%;
  }

  &:nth-child(2n) {
    background-color: #ffffe0;
  }
  &:nth-child(2n + 1) {
    background-color: #87cefa;
  }

  & label {
    position: absolute;
    right: 1%;
  }

  h3 {
    margin-left: 3%;
    display: block;
    font-size: ${({ theme }) => theme.fontSize.medium};
    flex-grow: 2;

    @media (max-width: 374px) {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }
  p {
    margin: auto 5px;

    @media (max-width: 374px) {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }

    @media (min-width: 375px) and (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }
`;

const SetNewLimitButton = styled(ButtonAddItem)`
  /* position: absolute;
  top: 5%;
  left: 15%; */
  display: block;
  margin: 15px 0 15px 10px;

  height: 45px;
  transition: 0.7s;
  width: 200px;
  background-color: #8d87fa;
  border: 4px solid #87a8fa;

  p {
    font-size: ${({ theme }) => theme.fontSize.normal};
    text-transform: uppercase;
  }

  &:hover {
    background-color: #87a8fa;
    color: white;
    cursor: pointer;
    /* transform: scale(3, 1); */
  }
`;

const Settings = ({ products }) => {
  //valueLimitForm - zminna boolen, która sprawdza czy ma się odpalić formularz zmiany limitu dla danego produktu
  const [valueLimitForm, setValueLimitForm] = useState(false);

  const deleteForm = () => {
    setValueLimitForm(false);
  };

  return (
    <div>
      <Menu />
      <WrapperSettings>
        <Heading>Ustawienia limitów</Heading>
        <span>
          Ustaw limity dla produktów. Produkt pojawi się na liście zakupów gdy w spiżarni będzie go
          mniej niż ustawiony limit.
        </span>
        <SetNewLimitButton onClick={() => setValueLimitForm(true)}>
          <p>
            <strong>Zmień / dodaj limit</strong>
          </p>
        </SetNewLimitButton>
        <WrapperLimits>
          {products.map((item) => (
            <Limit key={item.id} id={item.id}>
              <h3>{item.name}</h3>

              <ParagraphLimit>Limit: </ParagraphLimit>
              <ParagraphLimitAmount>
                <strong>
                  {item.limit} {item.unit}
                </strong>
              </ParagraphLimitAmount>
            </Limit>
          ))}
          {valueLimitForm && <FormTemplate type="set" deleteForm={() => deleteForm()} />}
        </WrapperLimits>
      </WrapperSettings>
      {console.log(valueLimitForm)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Settings);
