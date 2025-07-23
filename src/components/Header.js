import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  margin: 0;
  padding: 0;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  span {
    display: inline-block;
    margin: 0;
  }

  button {
    text-indent: -9999px;
    white-space: nowrap;
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
    height: 48px;
    width: 48px;
    border-radius: 12px;
    margin: 0 8px;
    outline: none;
    filter: brightness(0) invert(1);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .home {
    background-image: url(/images/home.svg);
  }

  .settings {
    background-image: url(/images/settings.svg);
  }

  .title {
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .filler {
    width: 48px;
    margin: 0 8px;
  }
`;

export default function Header({ title, settingsClick }) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      {settingsClick && (
        <button className="home" onClick={navigateHome}>
          Home
        </button>
      )}

      <span className="title">{title}</span>

      {settingsClick && (
        <button
          className="settings"
          onClick={settingsClick}
          aria-label="Settings"
        ></button>
      )}
    </HeaderContainer>
  );
}
