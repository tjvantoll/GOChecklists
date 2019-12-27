import React from "react";
import { useHistory } from "react-router-dom";

export default function Header({ title, settingsClick}) {
  const history = useHistory();

  const navigateHome = () => {
    history.push("/");
  };

  return (
    <h1>
      <button className="home" onClick={navigateHome}>Home</button>
      <span className="title">{title}</span>
      <button className="settings" onClick={settingsClick}></button>
    </h1>
  );
};
