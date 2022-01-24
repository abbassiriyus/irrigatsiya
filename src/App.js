import React, { Component } from "react";
import { connect } from "react-redux";
import { uzLanguege } from "./componenet/redux/Actions/uzLanguege";
import { ruLanguege } from "./componenet/redux/Actions/ruLanguege";
import { enLanguege } from "./componenet/redux/Actions/enLanguege";
import { GetValue } from "./componenet/config/localstorage";
import Navbar1 from "./componenet/js/Navbar1";
import "./App.css";
import { Spinner } from "react-bootstrap";

class App extends Component {
  state = {
    loader: true,
  };
  componentDidMount() {
    if (GetValue("project1", "uz")) {
      this.props.uzLanguege();
    } else if (GetValue("project1", "en")) {
      this.props.enLanguege();
    } else {
      this.props.ruLanguege();
    }

    setInterval(() => {
      this.setState({ loader: false });
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.loader ? (
          <div className="ReactLoader">
            <h1>
              <Spinner animation="grow" variant="info" />
            </h1>
          </div>
        ) : (
          <div style={{ overflowX: "hidden" }}>
            <Navbar1 />
            <div className="arrowTop">
              <a href="/#">
                <div className="tops" id="2">
                  <i className="fa fa-arrow-up"></i>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uzLang: state.changeLang.uzLang,
    enLang: state.changeLang.enLang,
  };
};
export default connect(mapStateToProps, { uzLanguege, ruLanguege, enLanguege })(
  App
);
