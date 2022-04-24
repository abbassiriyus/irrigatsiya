import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import React from "react";
import { rootReduser } from "./componenet/redux/Redusers/RootRedusers";
import App from "./App";
import "./FA/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CaruselPage from "./componenet/js/CaruselPage";
import "antd/dist/antd.css";
import { TestyechishQism } from "./componenet/js/TestyechishQism";
import { Pdf } from "./componenet/js/Pdf";
import Pdfdocs from "./componenet/js/Pdfdocs";

const commonStore = createStore(rootReduser);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={commonStore}>
      <App />
      {/* <Pdfdocs /> */}
      {/* <Pdf/> */}
      {/* <TestyechishQism/> */}
      {/* <CaruselPage /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
