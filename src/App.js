import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { UnitView } from "./Views/UnitView";
import { Header} from "./Components/Header"
import * as d3 from 'd3'
const App = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      const d = await d3.csv('ieee_vis_1990_2018.csv')
      setData(d)
    }
    getData()
  }, [])
  const title = "Vis for Vis - PKU Vis"
  const affliation = "";
  return (
    <div className="App">
      <div className="HeaderContainer">
        <Header title={title} affliation={affliation} />
      </div>
      <UnitView data={data} />
    </div>
  );
}

export default App;
