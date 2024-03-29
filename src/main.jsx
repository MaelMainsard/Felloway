import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './css/index.css';
import { BrowserRouter } from "react-router-dom";
import { store } from './context/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
