import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import NavBar from "./components/NavBar";
import Run from "./components/Run";
import Dashboard from "./components/Dashboard";
import Playground from "./components/Playground";
import Records from "./components/Records";
import RecordDetails from "./components/RecordDetails";
import About from "./components/About";

function Temp() {
  return <div>temp</div>;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/run" component={Run} />
          <Route path="/playground" component={Playground} />
          <Route path="/records" component={Records} />
          <Route path="/record/:id" component={RecordDetails} />
          <Route path="/about" component={About} />
          <Route component={Records} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
