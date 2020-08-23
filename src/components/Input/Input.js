import React from 'react';
import styled from 'styled-components';

export const Input = styled.input `
    padding: 3px 10px;
    margin: 10px 5px;
    border-radius: 10px;
    border: 1px gray solid;
`;

export const SearchInput = styled.input `
   
    width: 120px;
    height: 30px;
    padding-left: 5px;
    border: 1px solid black;
    border-radius: 10px;

    &:focus {
        outline:none;
        /* border: 2px solid #87a8fa; */
        border: 2px solid ${({ theme }) => theme.backgroundColor.main};

    }

    &::placeholder :focus{
        
    }

       
`;