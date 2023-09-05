import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './Tooltip.css'


const Tooltip = (props) => {
  const [active, setActive] = useState(false)

  const tipShow = () => {
    setActive(true)
  }

  const tipHide = () => {
    setActive(false);
  }
  return (
    <div
      className="Tooltip-Wrapper"

      onMouseEnter={tipShow}
      onMouseLeave={tipHide}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
