import React from "react";
import "./App.css";

import { Provider } from "react-redux";

import NavBar from "./components/NavBar";
import Run from "./components/Run";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <div className="App">
        {/* <MyStyledComponent /> */}
        <Run />
      </div>
    </Provider>
  );
}

export default App;
