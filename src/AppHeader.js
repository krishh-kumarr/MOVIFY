import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Film } from 'lucide-react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background: linear-gradient(45deg, #ff4e50, #f9d423, #ff4e50);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  color: white;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    transform: translateY(-3px);
  }
`;

const LogoIcon = styled(Film)`
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const AppTitle = styled.span`
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const AppHeader = () => {
  return (
    <HeaderContainer>
      <LogoIcon size={40} />
      <AppTitle>Movify - Your Cinematic Journey</AppTitle>
    </HeaderContainer>
  );
};

export default AppHeader;
