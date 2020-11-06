import React from "react";
import "./index.scss";
import * as d3 from "d3";

export const ControlView = () => {
  const buttons = [
    {
      text: "All Chinese",
      class: "All_China",
      select: "all-china",
      buttonClass: "active-button-china",
    },
    {
      text: "Part Chinese",
      class: "Has_China",
      select: "has-china",
      buttonClass: "active-button-china",
    },
    {
      text: "All Japanese",
      class: "All_Japan",
      select: "all-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "Part Japanese",
      class: "Has_Japan",
      select: "has-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "All Korean",
      class: "All_Korea",
      select: "all-korea",
      buttonClass: "active-button-korea",
    },
    {
      text: "Part Korean",
      class: "Has_Korea",
      select: "has-korea",
      buttonClass: "active-button-korea",
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
  const className = ["button", selected && button.buttonClass]
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
