/*
  // https://gist.github.com/nathansmith/521059b2221c8070d0b703691e13c9cf
  // Used like so…
  <Render if={isUserAuthenticated}>
    <p>
      Super secret UI.
    </p>
  </Render>
*/

import type { ReactNode } from "react";

interface RenderProps {
  children?: ReactNode;
  if: boolean;
}

const Render = ({ children = null, if: isTruthy = false }: RenderProps) => {
  if (isTruthy) {
    return <>{children}</>;
  }
  return null;
};

export default Render;
