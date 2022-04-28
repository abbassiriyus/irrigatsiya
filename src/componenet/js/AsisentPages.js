import React, { Component } from "react";
import { connect } from "react-redux";
import Typed from "react-typed";
import { saveTuitor } from "../config/tuitor";
import style3 from "../css/Asisent.module.css";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import kafedraLogo from "./../img/kafedra_logo.png";
class AsisentPages extends Component {
  // name = ["Mustafoqulov Alimardon Mamatovich"];
  // nameru = ["Мустафокулов Алимардон Маматович"];
  // nameen = ["Mustafokulov Alimardon Mamatovich"];
  state = {
    userdata: [],
    profiledata: [],
  };
  getMalumot(uz, en) {
    saveTuitor(uz, en)
      .then((res) => {
        // console.log(res.data)
        this.setState({
          userdata: res.data,
          profiledata: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getMalumot(this.props.uzLang, this.props.enLang);
  }
  render() {
    const { userdata, profiledata } = this.state;
    const { uzLang, enLang } = this.props;
    return (
      <div id={style3.section1} className="section-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-2 col-md-3 d-flex justify-content-center">
                  <img className={style3.imgLogo} src={kafedraLogo} />
                </div>
                <div className="col-lg-9 col-md-9">
                  <h6 id={style3.asisent} className="asisent my-3">
                   
                    {userdata.level}
                  </h6>
                  {/* <Typed
                    id={style3.typedtext}
                    className="typed-text text-center"
                    style={{ color: "#3365a5", fontSize: "18px" }}
                    strings={
                      uzLang ? this.name : enLang ? this.nameen : this.nameru
                    }
                    typeSpeed={100}
                    backSpeed={100}
                  /> */}
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  AsisentPages
);
