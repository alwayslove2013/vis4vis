import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { UnitView } from "./Views/UnitView";
import { Header } from "./Components/Header";
import * as d3 from "d3";
import { DetailView } from "./Views/DetailView";
import { ControlView } from "./Views/ControlView";
import UserView from "./Views/UserView";
import { get } from "lodash";

const App = () => {
  const [data, setData] = React.useState([]);

  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const visData = await d3.csv("ieee_vis_1990_2019[countries]_1222.csv");

      const pvisData = await d3.csv("pvis_1990_2020_countries.csv");

      const allData = visData.concat(pvisData);
      allData.forEach((d) => {
        d.originDoi = d["DOI"].concat();
        // console.log('Origin', d.originDoi);

        d["DOI"] = d["DOI"]
          .replaceAll("/", "")
          .replaceAll(".", "")
          .replaceAll("#", "");
      });

      setData(allData);
    };
    getData();
  }, []);

  const { doi2paper, refNet, citedNet } = React.useMemo(() => {
    const doi2paper = {};
    const refNet = {};
    const citedNet = {};
    data.forEach((d) => {
      const refs = d["InternalReferences"].split(";");
      // console.log(d["DOI"])
      const doi = d["DOI"];
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

  const handleClick = (unit) => {
    // console.log("unit", unit);
    const doi = unit.DOI;
    console.log("selected", doi);
    if (doi && doi !== selected.DOI) {
      let refs = refNet[selected.DOI] || [];
      let citeds = citedNet[selected.DOI] || [];
      d3.select(`#unit-${selected.DOI}`).classed("selected", false);
      refs.forEach((ref) => {
        d3.select(`#unit-${ref}`).classed("selected-ref", false);
      });
      citeds.forEach((cited) => {
        d3.select(`#unit-${cited}`).classed("selected-cited", false);
      });
      refs = refNet[doi] || [];
      citeds = citedNet[doi] || [];
      // console.log("after", refs, citeds);
      d3.select(`#unit-${doi}`).classed("selected", true);
      refs.forEach((ref) => {
        d3.select(`#unit-${ref}`).classed("selected-ref", true);
      });
      citeds.forEach((cited) => {
        d3.select(`#unit-${cited}`).classed("selected-cited", true);
      });
    }
    setSelected(unit);
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const newData = [...data];
    newData.forEach((d) => {
      d.isReadSelected =
        selectedUsers.filter((user) => d.isReadUsers && d.isReadUsers.has(user))
          .length > 0;
    });
    setData(newData);
  }, [selectedUsers]);

  // const [title2users, setTitle2users] = useState([]);
  const fetchUsers = async () => {
    fetch("http://vis.pku.edu.cn/vis4vis/getUser")
      .then((res) => res.json())
      .then((title2users) => {
        console.log("title2users", title2users);
        data.forEach((d) => {
          const isReadUsersString = get(title2users, d.Title, "");
          const isReadUsers = new Set(isReadUsersString.split(","));
          d.isReadUsers = isReadUsers;
        });
        // setTitle2users(title2users);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, [data]);
  const refetchUsers = () => fetchUsers();

  const handleClickBackground = () => {
    let refs = refNet[selected.DOI] || [];
    let citeds = citedNet[selected.DOI] || [];
    d3.select(`#unit-${selected.DOI}`).classed("selected", false);
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
          <ControlView
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
        <div className="MainViewContainer" onClick={handleClickBackground}>
          <UnitView data={data} handleClick={handleClick} />
        </div>
        <div className="DetalViewContainer">
          {/* {selected !== "" && selected in doi2paper && (
            <DetailView selectedPaper={selected} />
          )} */}
          <DetailView selectedPaper={selected} refetchUsers={refetchUsers} />
        </div>
        {/* <div className="UserViewController">
          <UserView />
        </div> */}
      </div>
    </div>
  );
};

export default App;
