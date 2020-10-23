import React from "react";
import "./index.scss";

export const UnitBlock = ({ unitBlock, handleClick }) => {
  const countAttr = "CitationCount";
  unitBlock.sort((a, b) => b[countAttr] - a[countAttr]);
  return (
    <div className="unit-block-container">
      {unitBlock.map((unit) => (
        <Unit key={unit["Title"]} title={unit["Title"]} count={unit[countAttr]} doi={unit['DOI']} handleClick={handleClick}/>
      ))}
    </div>
  );
};

export const Unit = ({ title, count, doi, handleClick }) => {
  const style = {
    opacity: count > 70 ? 0.8 : count / 100 + 0.1,
  };
  return <div title={title} className="unit" id={`unit-${doi}`} style={style} onClick={() => handleClick(doi)} />;
};
