import React, { Component } from "react";
import { connect } from "react-redux";
import Typed from "react-typed";
import { saveTuitor } from "../config/tuitor";
import style3 from "../css/Asisent.module.css";
import {uzLanguege} from '../redux/Actions/uzLanguege';
import {enLanguege} from '../redux/Actions/enLanguege';
import {ruLanguege} from '../redux/Actions/ruLanguege'; 
import kafedraLogo from './../img/kafedra_logo.png'
class AsisentPages extends Component {

  name=['Mustafoqulov Alimardon Mamatovich']
  nameen=['Мустафокулов Алимардон Маматович']
  state = {
    userdata: [],
    profiledata: [],
    name: [],
  }
  getMalumot(uz,en) {
    saveTuitor(uz,en).then((res) => {
        this.setState({
          userdata: res.data,
          profiledata: res.data.user,
        });
      })
      .catch((res) => {
        
      });
  }
  componentDidMount() {
    this.getMalumot(this.props.uzLang,this.props.enLang);
  }
  render() {
    const { userdata, profiledata } = this.state;
    const {uzLang,enLang} = this.props;
    return (
      <div id={style3.section1} className="section-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex">
            
              <div className="row">
              <div className="col-lg-3 col-md-3 d-flex justify-content-center"><img className={style3.imgLogo} src={kafedraLogo}/></div>
              <div className="col-lg-9 col-md-9"><p id={style3.asisent} className="asisent my-3"> {userdata.level}</p>
              <Typed
              id={style3.typedtext}
                className="typed-text text-center"
                strings={uzLang?this.name:enLang?this.name:this.nameen}
                typeSpeed={100}
                backSpeed={100}
              />{" "}
              <p className=" my-2">
                <a href="#home">
                  {uzLang?"Bosh sahifa":enLang?"Home":"Главная"} <i className="fa fa-chevron-right mx-2"></i>
                </a>{" "}
                <p className="d-inline-block myname" id={style3.myname}>
                  {profiledata.last_name + " " + profiledata.first_name}
                </p>
              </p></div>
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

export default connect(mapStateToProps, {uzLanguege,  ruLanguege, enLanguege })(AsisentPages);