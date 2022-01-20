import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from "react";
import { rootReduser } from "./componenet/redux/Redusers/RootRedusers";
import App from "./App";
import './FA/css/all.min.css'

const commonStore = createStore(
  rootReduser,
)
ReactDOM.render(
  <React.StrictMode>
    
     <Provider store={commonStore}>
    
            <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
