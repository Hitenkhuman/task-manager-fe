import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  id: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, id }) => {
  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={title}>
        {children}
      </div>
      <ReactTooltip id={id} />
    </>
  );
};

export default Tooltip;
