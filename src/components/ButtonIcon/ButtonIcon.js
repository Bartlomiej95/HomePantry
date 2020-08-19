import styled from 'styled-components';

export const ButtonIcon = styled.button `
    display: block;
    width: 50px;
    height: 50px;
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 70% 70%;
    background-color: ${({ theme }) => theme.backgroundColor.main};
    border-radius: 20px;
    margin-bottom: 10px;
    cursor:pointer;

    &.active{
        background-color: #c3e6fc;
    }

    @media (max-width: 374px){
        width: 30px;
        height: 30px;
    }
    @media(min-width: 375px) and (max-width: 768px){
        width:40px;
        height: 40px;
    }
`;