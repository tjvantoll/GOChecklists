import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.h1`
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #fd5f00, #fca15c);
  color: white;
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  span {
    display: inline-block;
    margin: 0.4em 0;
  }
  button {
    text-indent: -9999px;
    white-space: nowrap;
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 2.5em;
    background-position: 0.7em 0.3em;
    height: 3em;
    width: 4em;
    padding: 1em;
    outline: none;
    filter: invert(100%) sepia(0%) saturate(109%) hue-rotate(329deg)
      brightness(105%) contrast(102%);
    cursor: pointer;
  }
  .home {
    background-image: url(/images/home.svg);
  }
  .settings {
    background-image: url(/images/settings.svg);
  }
  .logo {
    width: 2.5em;
    height: 2.5em;
    margin-right: 0.3em;
  }
  .title {
    flex-grow: 2;
  }
  .filler {
    width: 2em;
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

      <img className="logo" src="/images/app-logo.svg" alt="App logo" />
      <span className="title">{title}</span>

      {settingsClick && (
        <button className="settings" onClick={settingsClick}></button>
      )}
    </HeaderContainer>
  );
}
