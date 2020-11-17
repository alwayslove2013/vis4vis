import React from "react";
import "./index.scss";
import * as d3 from "d3";

export const ControlView = () => {
  const buttons = [
    {
      text: "Independent",
      class: "All_China",
      select: "all-china",
      buttonClass: "active-button-china",
    },
    {
      text: "Independent",
      class: "All_Japan",
      select: "all-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "Independent",
      class: "All_Korea",
      select: "all-korea",
      buttonClass: "active-button-korea",
    },
    {
      text: "Cooperative",
      class: "Has_China",
      select: "has-china",
      buttonClass: "active-button-china",
    },
    {
      text: "Cooperative",
      class: "Has_Japan",
      select: "has-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "Cooperative",
      class: "Has_Korea",
      select: "has-korea",
      buttonClass: "active-button-korea",
    },
  ];
  const handleClick = (button, flag) => {
    console.log("button", button, flag);
    d3.selectAll(`.${button.class}`).classed(button.select, flag);
  };
  return (
    <div className="control-view">
      <div className="contril-panel-contry">
        <>
          <div className="control-view-header">China</div>
          <div className="control-view-header">Japanese</div>
          <div className="control-view-header">Korean</div>
          {buttons.map((button) => (
            <Button
              key={button.text}
              button={button}
              handleClick={handleClick}
            />
          ))}
        </>
      </div>
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
  const num = d3.selectAll(`.${button.class}`).nodes().length;
  return (
    <div className={className} onClick={() => _handleClick()}>
      {button.text} {`(${selected ? num : 0})`}
    </div>
  );
};
