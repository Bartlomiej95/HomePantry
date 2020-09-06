import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor.main};
  color: black;
`;

export const ButtonAddItem = styled(Button)`
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 28px;
`;

export const ButtonEdit = styled(Button)`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 40%;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
  align-self: center;
`;

export const ButtonDelete = styled(Button)`
  position: absolute;
  top: 0%;
  right: 0%;
  width: 20px;
  height: 20px;
  transform: translate(25%, -25%);
  border: none;
  color: white;
  background-color: red;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 374px) {
    width: 15px;
    height: 15px;
    font-size: 10px;
    color: white;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 18px;
    height: 18px;
    font-size: 11px;
  }
`;
