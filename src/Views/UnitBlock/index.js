import React from "react";
import "./index.scss";

export const UnitBlock = ({ unitBlock, handleClick }) => {
  const countAttr = "CitationCount";
  unitBlock.sort((a, b) => b[countAttr] - a[countAttr]);
  return (
    <div className="unit-block-container">
      {unitBlock.map((unit) => (
        <Unit
          key={unit["Title"]}
          title={unit["Title"]}
          count={unit[countAttr]}
          doi={unit["DOI"]}
          handleClick={handleClick}
          // All_China={unit.All_China}
          // All_Japan={unit.All_Japan}
          // All_Korea={unit.All_Korea}
          // Has_Korea={unit.Has_Korea}
          // Has_China={unit.Has_China}
          // Has_Japan={unit.Has_Japan}
          unit={unit}
        />
      ))}
    </div>
  );
};

export const Unit = ({ title, count, doi, handleClick, unit }) => {
  const {
    All_China,
    All_Japan,
    All_Korea,
    Has_Korea,
    Has_China,
    Has_Japan,
  } = unit;
  const style = {
    opacity: count > 100 ? 0.6 : count / 200 + 0.1,
  };
  const className = [
    "unit",
    All_China == "True" && "All_China",
    All_Japan == "True" && "All_Japan",
    All_Korea == "True" && "All_Korea",
    Has_China == "True" && "Has_China",
    Has_Japan == "True" && "Has_Japan",
    Has_Korea == "True" && "Has_Korea",
    unit.isReadSelected && "isRead",
  ]
    .filter((d) => d)
    .join(" ");
  return (
    <div
      title={title}
      className={className}
      id={`unit-${doi}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(unit);
      }}
    />
  );
};
