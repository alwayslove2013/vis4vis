import React from "react";
import "./index.scss";
import { UnitBlock } from "../UnitBlock";
export const UnitView = ({ data }) => {
  console.log("data", data);
  const visTypeList = ["InfoVis", "VAST", "SciVis"];
  const beginYear = 1990;
  const endYear = 2018;
  const yearList = [];
  for (let i = endYear; i >= beginYear; i--) {
    yearList.push(i);
  }
  const gridData = {};
  visTypeList.forEach((visType) => {
    gridData[visType] = {};
    yearList.forEach((year) => {
      gridData[visType][year] = [];
    });
  });
  data.forEach((d) => {
    const type = d["Conference"] === "Vis" ? "SciVis" : d["Conference"];
    const year = d["Year"];
    gridData[type][year].push(d);
  });
  console.log("gridData", gridData);
  return (
    <div className="unit-view-container">
      <div className="blank"></div>
      {yearList.map((year) => (
        <ColHeader key={year} year={year} />
      ))}
      {visTypeList.map((visType) => (
        <React.Fragment key={visType}>
          <div className="row-header">{visType}</div>
          {yearList.map((year) => (
            <UnitBlock key={visType + year} unitBlock={gridData[visType][year]} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const ColHeader = ({ year }) => {
  return <div className="col-header">{year}</div>;
};
