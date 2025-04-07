import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #2196f3, #1976d2);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SettingsButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: currentColor;
  }
`;

export default function Header({ title, settingsClick }) {
  return (
    <HeaderContainer>
      <Title to="/">{title}</Title>
      {settingsClick && (
        <SettingsButton onClick={settingsClick}>
          <svg viewBox="0 0 24 24">
            <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6a2 2 0 012 2v1.09a7.007 7.007 0 013.9 1.56l.77-.77a2 2 0 112.83 2.83l-.77.77A7.007 7.007 0 0120.91 12H22a2 2 0 110 4h-1.09a7.007 7.007 0 01-1.56 3.9l.77.77a2 2 0 11-2.83 2.83l-.77-.77A7.007 7.007 0 0112 20.91V22a2 2 0 11-4 0v-1.09a7.007 7.007 0 01-3.9-1.56l-.77.77a2 2 0 11-2.83-2.83l.77-.77A7.007 7.007 0 013.09 16H2a2 2 0 110-4h1.09a7.007 7.007 0 011.56-3.9l-.77-.77a2 2 0 112.83-2.83l.77.77A7.007 7.007 0 0112 3.09V2a2 2 0 012-2z" />
          </svg>
        </SettingsButton>
      )}
    </HeaderContainer>
  );
}
