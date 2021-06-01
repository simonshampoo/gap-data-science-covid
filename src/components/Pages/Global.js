import React, { useState } from "react";
import confirmedCasesJSON from "./global_data/confirmed.json";
import deathJSON from "./global_data/globaldeaths.json";
import recoveredJSON from "./global_data/recovered.json";
import "./Global.css";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//High priority
// @TODO, write cool facts about the data (mean, median, sd, min/max)
// @TODO, compare two countries against each other

//Low priority
//@TODO news section using API for new global covid news
//@TODO, formatting for the graph so its less long

const Selection = () => {
  const [country, setCountry] = useState("");
  const [graphActive, setGraphActive] = useState(false);
  const [buttonText, setButtonText] = useState("show graph");
  const [graphType, setGraphType] = useState("area");

  const confirmedDataPreFormatted = confirmedCasesJSON.filter(
    (_country) => country === _country["Country/Region"]
  );
  const confirmedDataObject = confirmedDataPreFormatted[0];
  const rexDate = /^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{2})$/;

  const confirmedCasesDataArray =
    confirmedDataObject != null
      ? Object.entries(confirmedDataObject)
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
      text: "Time vs. Total Confirmed COVID-19 Cases for " + country,
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
    (_country) => country === _country["Country/Region"]
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
      text: "Time vs. Total COVID-19 Related Deaths for " + country,
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

  const recoveredDataPreformatted = recoveredJSON.filter(
    (_country) => country === _country["Country/Region"]
  );
  const recoveredDataObject = recoveredDataPreformatted[0];

  const recoveredDataArray =
    recoveredDataObject != null
      ? Object.entries(recoveredDataObject)
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

  const recoveredData = {
    zoomEnabled: true,
    axisX: {
      title: "Timeline",
      gridThickness: 2,
    },
    axisY: {
      title: "COVID-19 Recoveries",
    },
    title: {
      text: "Time vs. Total COVID-19 Recoveries for " + country,
      fontWeight: "lighter",
      fontFamily: "arial",
    },
    data: [
      {
        type: graphType,
        dataPoints: recoveredDataArray,
      },
    ],
  };

  //---------------------------------------------------------

  const countryList = [
    ...new Set(
      confirmedCasesJSON
        .filter((info) => isNaN(info["Country/Region"].slice(-1)))
        .map((info) => info["Country/Region"])
    ),
  ];
  countryList.unshift("Select a country");

  return (
    <div>
      <label className="country">country:&nbsp;&nbsp;</label>
      <select
        className="country-select"
        onChange={(e) => {
          setCountry("");
          e.preventDefault();
          setCountry(e.target.value);
        }}
      >
        {countryList.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>
      {/* ------------------------------------------------------------ */}
      {/* ------------------------------------------------------------ */}
      {/* ------------------------------------------------------------ */}
      <br />
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
      {/* ------------------------------------------------------------ */}
      <br />
      <button
        className="button"
        type="submit"
        onClick={() => {
          buttonText === "show graph"
            ? setButtonText("hide graph")
            : setButtonText("show graph");
          setGraphActive(!graphActive);
        }}
      >
        {buttonText}
      </button>
      {graphActive && <CanvasJSChart options={confirmedCasesData} />}
      {graphActive && <CanvasJSChart options={deathData} />}
      {graphActive && (
        <div>
          <CanvasJSChart options={recoveredData} />
        </div>
      )}
    </div>
  );
};

const Global = () => {
  return (
    <div className="dashboard">
      <div className="title">COVID-19 Country Visualizer</div>
      <div className="instructions">
        select a country to see charts and data about how COVID-19 has affected
        it from as early as January 2020 to May 2021.
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
export default Global;
