import React from "react";
import styled from "styled-components";

const ProgressbarContainer = styled.div`
  display: flex;
  margin: 0.6em 0.5em 0.2em 0.5em;

  .progressbar {
    border-radius: 6px;
    background: #eee;
    width: 100%;
    overflow: hidden;
  }
  .progressbar-contents {
    height: 16px;
    background: linear-gradient(90deg, #fd5f00, #fca15c);
  }
  & > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 5.5em;
    text-align: center;
    font-size: 0.8em;
  }
`;

export default function Progressbar({ value, max }) {
  const getWidth = () => {
    if (!max) {
      return "0";
    }

    return ((value / max) * 100) + "%";
  }

  return (
    <ProgressbarContainer>
      <div className="progressbar">
        <div
          className="progressbar-contents"
          style={{
            width: getWidth(),
          }}>
        </div>
      </div>
      {!!max && 
        <span>{`${value} / ${max}`}</span>
      }
    </ProgressbarContainer>
  );
}
