import React from "react";
import Navbar from "./components/Stickies/Navbar";
import "./App.css";
import "./components/Pages/About.css";
import UnitedStates from "./components/Pages/UnitedStates";
import Global from "./components/Pages/Global";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import { Switch, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route
            path="/unitedstates"
            exact
            component={() => <UnitedStates />}
          />
          <Route path="/global" exact component={() => <Global />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
