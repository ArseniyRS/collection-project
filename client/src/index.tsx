import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom"; 
ReactDom.render(
  <Provider store={store()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
