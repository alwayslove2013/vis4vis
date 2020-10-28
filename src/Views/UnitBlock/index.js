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
          All_China={unit.All_China}
          All_Japan={unit.All_Japan}
          Has_China={unit.Has_China}
          Has_Japan={unit.Has_Japan}
        />
      ))}
    </div>
  );
};

export const Unit = ({
  title,
  count,
  doi,
  handleClick,
  All_China,
  All_Japan,
  Has_China,
  Has_Japan,
}) => {
  const style = {
    opacity: count > 70 ? 0.8 : count / 100 + 0.1,
  };
  const className = [
    "unit",
    All_China=='True' && "All_China",
    All_Japan=='True' && "All_Japan",
    Has_China=='True' && "Has_China",
    Has_Japan=='True' && "Has_Japan",
  ]
    .filter((d) => d)
    .join(" ");
  return (
    <div
      title={title}
      className={className}
      id={`unit-${doi}`}
      style={style}
      onClick={() => handleClick(doi)}
    />
  );
};
