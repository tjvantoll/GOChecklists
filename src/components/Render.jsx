/*
  // https://gist.github.com/nathansmith/521059b2221c8070d0b703691e13c9cf
  // Used like so…
  <Render if={isUserAuthenticated}>
    <p>
      Super secret UI.
    </p>
  </Render>
*/

import React from 'react';

const Render = ({
  children = null,
  if: isTruthy = false,
}) => {
  let ui = null;

  if (isTruthy) {
    ui = (
      <>
        {children}
      </>
    );
  }

  return ui;
}

export default Render;