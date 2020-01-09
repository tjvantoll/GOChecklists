import React from "react";
import styled from "styled-components";

const LoadingImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
`;

export default function Loading() {
  return (
    <LoadingImage
      src="/images/loading.gif"
      alt="Loading" >
    </LoadingImage>
  );
}
