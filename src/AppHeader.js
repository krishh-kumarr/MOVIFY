import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #007bff; /* Same color as the button */
  color: white;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Animation for shadow and scale */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Deeper shadow on hover */
    transform: translateY(-2px); /* Slight lift effect on hover */
  }
`;

const AppHeader = () => {
  return (
    <HeaderContainer>
      Movify - Your Movie Search App
    </HeaderContainer>
  );
};

export default AppHeader;
