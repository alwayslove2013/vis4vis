import React from "react";
import "./index.scss";

export const UnitBlock = ({ unitBlock }) => {
  const countAttr = "AminerCitationCount_06-2020";
  unitBlock.sort((a, b) => b[countAttr] - a[countAttr])
  return (
    <div className="unit-block-container">
      {unitBlock.map((unit) => (
        <Unit key={unit['Title']} count={unit[countAttr]} />
      ))}
    </div>
  );
};

export const Unit = ({ count }) => {
  const style = {
    opacity: count > 180 ? 1 : count / 200 + 0.1,
  };
  return <div className="unit" style={style} />;
};
