import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { connect } from "react-redux";
import s from "../css/Multipleltems.module.css";

import { fotosLavha } from "../config/tuitor";
class MultipleItems extends Component {
  state = {
    fotoLavha: [],
  };

  getFotosLavha = () => {
    fotosLavha()
      .then((res) => {
        // console.log(res.data)
        this.setState({
          fotoLavha: res.data,
        });
      })
      .catch((res) => {});
  };
  componentDidMount() {
    this.getFotosLavha();
  }
  render() {
    const { fotoLavha } = this.state;
    const { uzLang, enLang } = this.props;
    return (
      <div
        style={{
          margin: "auto",
          padding: "10%",
          paddingTop: "50px",
          paddingBottom: "50px",
          textAlign: "center",
          backgroundColor: "none",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "50px" }}>
          {" "}
          {uzLang
            ? "Foto Lavhalar"
            : enLang
            ? "Photo Sheets"
            : "Фото листы"}{" "}
        </h2>
        <div
          className={s.carousel1}
          style={{
            // margin: "auto",
            padding: "10%",
            paddingTop: "50px",
            paddingBottom: "50px",
            textAlign: "center",
            backgroundColor: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Carousel
              showArrows={true}
              autoPlay={true}
              interval={3000}
              centerMode={true}
              dynamicHeight={true}
              emulateTouch={true}
            >
              {fotoLavha.map((item, index) => (
                <div className={s.mediasi} key={index}>
                  <div className={s.satr11}>
                    <h1>{item.name}</h1>
                    <p> {item.text}</p>
                  </div>
                  <img
                    src={item.image}
                    style={{ width: "100%", height: "100%" }}
                    className="card-img-top"
                    alt="rasimlar topilmadi"
                  />
                </div>
              ))}
            </Carousel>
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
  MultipleItems
);
