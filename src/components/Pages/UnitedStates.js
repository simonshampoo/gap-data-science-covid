import React, { useState } from "react";
import confirmedCasesJSON from "./us_data/confirmed.json";
import deathJSON from "./us_data/deaths.json";
import "./UnitedStates.css";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//High priority
// @TODO, SHOW COVID CASES FOR THE WHOLE STATE
// @TODO, write cool facts about the data (mean, median, sd, min/max)

//Low priority
//@TODO, compare two states against each other
//@TODO, United states map color warmth visualizer based on cases
//@TODO, formatting for the graph so its less long
//@TODO, dont render graph on US state change

const Selection = () => {
  const [USState, setUSState] = useState("");
  const [county, setCounty] = useState("");
  const [graphActive, setGraphActive] = useState(false);
  const [buttonText, setButtonText] = useState("show graph");
  const [graphType, setGraphType] = useState("area");

  const confirmedDataPreFormatted = confirmedCasesJSON.filter(
    (_state) => USState === _state.Province_State && county === _state.Admin2
  );
  const confirmedDataObject = confirmedDataPreFormatted[0];
  const rexDate = /^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{2})$/; // evil floating point bit level hacking
  const countyFormatted = county === "" ? "" : county + ", ";

  const confirmedCasesDataArray =
    confirmedDataObject != null
      ? Object.entries(confirmedDataObject)
          .filter(([key]) => rexDate.test(key))
          .map(([key, value]) => {
            const {
              groups: { month, day, year },
            } = rexDate.exec(key);
            return {
              label: new Date(
                Number(year) + 2000,
                Number(month) - 1,
                Number(day)
              ).toDateString(),
              y: value,
            };
          })
      : null;

  const confirmedCasesData = {
    zoomEnabled: true,
    axisX: {
      title: "Timeline",
      gridThickness: 2,
    },
    axisY: {
      title: "Confirmed COVID-19 Cases (Thousands)",
    },
    title: {
      text:
        "Time vs. Total Confirmed COVID-19 Cases for " +
        countyFormatted +
        USState,
      fontWeight: "lighter",
      fontFamily: "arial",
    },
    data: [
      {
        type: graphType,
        dataPoints: confirmedCasesDataArray,
      },
    ],
  };

  //--------------------------------------------------------------
  const deathDataPreformatted = deathJSON.filter(
    (_state) => USState === _state.Province_State && county === _state.Admin2
  );
  const deathDataObject = deathDataPreformatted[0];

  const deathDataArray =
    deathDataObject != null
      ? Object.entries(deathDataObject)
          .filter(([key]) => rexDate.test(key)) // Is it a date according to our regex?
          .map(([key, value]) => {
            // Get the capture group using their names
            const {
              groups: { month, day, year },
            } = rexDate.exec(key);
            // Build the object
            return {
              label: new Date(
                Number(year) + 2000,
                Number(month) - 1,
                Number(day)
              ).toDateString(),
              y: value,
            };
          })
      : null;

  const deathData = {
    zoomEnabled: true,
    axisX: {
      title: "Timeline",
      gridThickness: 2,
    },
    axisY: {
      title: "COVID-19 Related Deaths",
    },
    title: {
      text:
        "Time vs. Total COVID-19 related deaths for " +
        countyFormatted +
        USState,
      fontWeight: "lighter",
      fontFamily: "arial",
    },
    data: [
      {
        type: graphType,
        dataPoints: deathDataArray,
      },
    ],
  };

  //----------------------------------------------

  const countyListForState = confirmedCasesJSON
    .filter((state) => USState === state.Province_State)
    .map((state) => state.Admin2);
  countyListForState.unshift("Select a county");

  const usStateList = [
    ...new Set(confirmedCasesJSON.map((info) => info.Province_State)),
  ];
  usStateList.unshift("Select a state");

  return (
    <div className="stuff">
      <label className="state">state:&nbsp;&nbsp;</label>
      <select
        className="state-select"
        onChange={(e) => {
          setUSState("");
          setCounty("N/A");
          e.preventDefault();
          setUSState(e.target.value);
        }}
      >
        {usStateList.map((state) => (
          <option key={state}>{state}</option>
        ))}
      </select>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <label className="county">county:&nbsp;&nbsp;</label>
      <select
        className="county-select"
        onChange={(e) => {
          setCounty("");
          e.preventDefault();
          setCounty(e.target.value);
        }}
      >
        {countyListForState.map((county) => (
          <option key={county}>{county}</option>
        ))}
      </select>
      {/* ------------------------------------------------------------ */}
      <br />
      {/* ------------------------------------------------------------ */}
      <label className="graphType">graph type:&nbsp;&nbsp;</label>
      <select
        className="graphtype-select"
        onChange={(e) => {
          setGraphType("");
          e.preventDefault();
          setGraphType(e.target.value);
        }}
      >
        <option key="area">area</option>
        <option key="column">column</option>
        <option key="scatter">scatter</option>
      </select>
      <br />
      <button
        className="button"
        type="submit"
        onClick={() => {
          buttonText === "show graph"
            ? setButtonText("hide graph")
            : setButtonText("show graph");
          setGraphActive(!graphActive);
          console.log("state is", USState);
          console.log("county", county);
        }}
      >
        {buttonText}
      </button>

      {graphActive && <CanvasJSChart options={confirmedCasesData} />}
      {graphActive && <CanvasJSChart options={deathData} />}
    </div>
  );
};

const UnitedStates = () => {
  return (
    <div className="dashboard">
      <div className="title">COVID-19 State and County visualizer</div>
      <div className="instructions">
        select a state and county to see charts and data about how COVID-19 has
        affected it from as early as January 2020 to May 2021.
        <br />
        hover over each data point to get more details. you can zoom in on the
        graph by clicking and dragging over the desired area.
        <br />
        graphs are updated automatically, and if you change the state, remember
        to change the 'county' field as well
      </div>
      <div>
        <Selection />
      </div>
    </div>
  );
};
export default UnitedStates;
