import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { UnitView } from "./Views/UnitView";
import { Header } from "./Components/Header";
import * as d3 from "d3";
import { Layout } from "antd";

const App = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      const dd = await d3.csv("ieee_vis_1990_2019.csv");
      setData(dd);
    };
    getData();
  }, []);
  const doi2paper = React.useMemo(() => {
    let res = {}
    data.forEach(d => {
      let doi = d["DOI"]
      .replaceAll("/", "")
      .replaceAll(".", "")
      .replaceAll("#", "");
      res[doi] = d
    })
    console.log('res', res)
    return res
  }, [data])
  const refNet = {};
  const citedNet = {};
  let clickDoi = "";
  let refs = refNet[clickDoi] || [];
  let citeds = citedNet[clickDoi] || [];
  data.forEach((d) => {
    const refs = d["InternalReferences"].split(";");
    const doi = d["DOI"]
      .replaceAll("/", "")
      .replaceAll(".", "")
      .replaceAll("#", "");
    d["DOI"] = doi;
    refs.forEach((ref) => {
      ref = ref.replaceAll("/", "").replaceAll(".", "").replaceAll("#", "");
      if (!(doi in refNet)) {
        refNet[doi] = [ref];
      } else {
        refNet[doi].push(ref);
      }
      if (!(ref in citedNet)) {
        citedNet[ref] = [doi];
      } else {
        citedNet[ref].push(doi);
      }
    });
  });
  const handleClick = (doi) => {
    console.log(refs, citeds);
    d3.select(`#unit-${clickDoi}`).classed("selected", false);
    refs.forEach((ref) => {
      d3.select(`#unit-${ref}`).classed("selected-ref", false);
    });
    citeds.forEach((cited) => {
      d3.select(`#unit-${cited}`).classed("selected-cited", false);
    });
    clickDoi = doi;
    refs = refNet[clickDoi] || [];
    citeds = citedNet[clickDoi] || [];
    d3.select(`#unit-${clickDoi}`).classed("selected", true);
    refs.forEach((ref) => {
      d3.select(`#unit-${ref}`).classed("selected-ref", true);
    });
    citeds.forEach((cited) => {
      d3.select(`#unit-${cited}`).classed("selected-cited", true);
    });
  };
  const title = "Vis for Vis";
  const affliation = "PKU Vis";
  return (
    <div className="App">
      <div className="HeaderContainer">
        <Header title={title} affliation={affliation} />
      </div>
      <div className="ContentContainer">
        <div className="MainViewContainer">
          <UnitView data={data} handleClick={handleClick} />
        </div>
        <div className="DetalViewContainer"></div>
      </div>
    </div>
  );
};

export default App;
