import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import NavBar from "./components/NavBar";
import Run from "./components/Run";
import Dashboard from "./components/Dashboard";
import Playground from "./components/Playground";
import Records from "./components/Records";
import RecordDetails from "./components/RecordDetails";
import About from "./components/About";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import LocalRecords from "./components/LocalRecords";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";

import { fbConfig, rrfConfig } from "./config";
import customTheme from "./customTheme";

firebase.initializeApp(fbConfig);
firebase.firestore();

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rrfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <BrowserRouter>
            <CssBaseline />
            <NavBar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/run" component={Run} />
              <Route path="/playground" component={Playground} />
              <Route path="/records" component={Records} />
              <Route path="/record/:id" component={RecordDetails} />
              <Route path="/local" component={LocalRecords} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/user" component={UserPage} />
              <Route component={Records} />
            </Switch>
            <ServiceWorkerWrapper />
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
