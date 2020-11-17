import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { UnitView } from "./Views/UnitView";
import { Header } from "./Components/Header";
import * as d3 from "d3";
import { DetailView } from "./Views/DetailView";
import { ControlView } from "./Views/ControlView";

const App = () => {
  const [data, setData] = React.useState([]);

  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      const visData = await d3.csv("ieee_vis_1990_2019[countries]_1116.csv");

      const pvisData = await d3.csv("pvis_1990_2020_countries.csv");
      setData(visData.concat(pvisData));
    };
    getData();
  }, []);

  const { doi2paper, refNet, citedNet } = React.useMemo(() => {
    const doi2paper = {};
    const refNet = {};
    const citedNet = {};
    data.forEach((d) => {
      const refs = d["InternalReferences"].split(";");
      const doi = d["DOI"]
        .replaceAll("/", "")
        .replaceAll(".", "")
        .replaceAll("#", "");
      d["DOI"] = doi;
      doi2paper[doi] = d;
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
    return { doi2paper, refNet, citedNet };
  }, [data]);

  const handleClick = (doi) => {
    console.log("selected", doi);
    if (doi && doi !== selected) {
      let refs = refNet[selected] || [];
      let citeds = citedNet[selected] || [];
      d3.select(`#unit-${selected}`).classed("selected", false);
      refs.forEach((ref) => {
        d3.select(`#unit-${ref}`).classed("selected-ref", false);
      });
      citeds.forEach((cited) => {
        d3.select(`#unit-${cited}`).classed("selected-cited", false);
      });
      refs = refNet[doi] || [];
      citeds = citedNet[doi] || [];
      console.log("after", refs, citeds);
      d3.select(`#unit-${doi}`).classed("selected", true);
      refs.forEach((ref) => {
        d3.select(`#unit-${ref}`).classed("selected-ref", true);
      });
      citeds.forEach((cited) => {
        d3.select(`#unit-${cited}`).classed("selected-cited", true);
      });
      setSelected(doi);
    }
  };
  const handleClickBackground = () => {
    let refs = refNet[selected] || [];
    let citeds = citedNet[selected] || [];
    d3.select(`#unit-${selected}`).classed("selected", false);
    refs.forEach((ref) => {
      d3.select(`#unit-${ref}`).classed("selected-ref", false);
    });
    citeds.forEach((cited) => {
      d3.select(`#unit-${cited}`).classed("selected-cited", false);
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
        <div className="ControlViewContainer">
          <ControlView />
        </div>
        <div className="MainViewContainer" onClick={handleClickBackground}>
          <UnitView data={data} handleClick={handleClick} />
        </div>
        <div className="DetalViewContainer">
          {selected !== "" && selected in doi2paper && (
            <DetailView selectedPaper={doi2paper[selected]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
