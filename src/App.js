import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { Home } from "./components/Home/Home";
import { About } from "./components/About";
import { NoMatch } from "./components/NoMatch";
import { Layout } from "./components/Layout";
import RecordDetails from "./components/RecordDetails";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Run } from "./components/Run/Run";
import { Footer } from "./components/Footer";
import { Records } from "./components/Records/Records";
import SignIn from "./components/SignIn";
import Playground from "./components/Playground";

import store from "./store";

import fbConfig from './config/fbConfig';
import rrfConfig from './config/rrfConfig';

firebase.initializeApp(fbConfig);
firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <NavigationBar />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/run" component={Run} />
              <Route path="/about" component={About} />
              <Route path="/signin" component={SignIn} />
              <Route path="/records" component={Records} />
              <Route path="/record/:id" component={RecordDetails} />
              <Route path="/playground" component={Playground} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
           {/* <Footer /> */}
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
