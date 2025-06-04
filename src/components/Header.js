import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ title, settingsClick }) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <h1 className="flex items-center bg-[#445ba1] text-white m-0 p-0 text-[1.5em] text-center">
      {settingsClick && (
        <button
          className="home bg-[url('/images/home.svg')] bg-no-repeat bg-[length:2.5em] bg-[position:0.7em_0.3em] h-[3em] w-[4em] p-4 text-[0] cursor-pointer filter invert"
          onClick={navigateHome}
        >
          Home
        </button>
      )}

      <span className="flex-grow inline-block my-[0.4em]">{title}</span>

      {settingsClick && (
        <button
          className="settings bg-[url('/images/settings.svg')] bg-no-repeat bg-[length:2.5em] bg-[position:0.7em_0.3em] h-[3em] w-[4em] p-4 text-[0] cursor-pointer filter invert"
          onClick={settingsClick}
        />
      )}
    </h1>
  );
}
