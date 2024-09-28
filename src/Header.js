import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1c1c;
  padding: 15px;
  color: #fff;
`;

const Logo = styled.h1`
  font-family: 'Algerian', sans-serif;
  font-size: 1.5rem;
  color: #feda6a; /* Vibrant yellow */
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const HeaderSearchInput = styled.input`
  width: 250px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #feda6a;
  cursor: pointer;
  border-radius: 5px;
  color: #000;
`;

const AppHeader = () => (
  <Header>
    <Logo>Movify</Logo>
    <Nav>
      <HeaderSearchInput type="text" placeholder="Search..." />
      <SearchButton>Search</SearchButton>
    </Nav>
  </Header>
);

export default AppHeader;
