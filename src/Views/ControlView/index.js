import React from "react";
import "./index.scss";
import * as d3 from "d3";

export const ControlView = () => {
  const buttons = [
    {
      text: "All Chinese",
      class: "All_China",
      select: "all-china",
    },
    {
      text: "All Japanese",
      class: "All_Japan",
      select: "all-japan",
    },
    {
      text: "Part Chinese",
      class: "Has_China",
      select: "has-china",
    },
    {
      text: "Part Japanese",
      class: "Has_Japan",
      select: "has-japan",
    },
  ];
  const handleClick = (button, flag) => {
    console.log('button', button, flag)
    d3.selectAll(`.${button.class}`).classed(button.select, flag);
  };
  return (
    <div className="control-view">
      {buttons.map((button) => (
        <Button key={button.text} button={button} handleClick={handleClick} />
      ))}
    </div>
  );
};

export const Button = ({ button, handleClick }) => {
  const [selected, setSelected] = React.useState(false);
  const className = ["button", selected && "active-button"]
    .filter((d) => d)
    .join(" ");
  const _handleClick = () => {
    handleClick(button, !selected);
    setSelected(!selected);
  };
  return (
    <div className={className} onClick={() => _handleClick()}>
      {button.text}
    </div>
  );
};
