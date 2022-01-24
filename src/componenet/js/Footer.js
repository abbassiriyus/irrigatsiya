import React, { Component } from "react";
import { connect } from "react-redux";
import { saveMaps, saveNumber } from "../config/tuitor";
import "../css/Footer.css";
import AOS from "aos";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";

AOS.init();
class Footer extends Component {
  state = {
    maps: [],
    number: [],
    number2: [],
    numbers: [],
  };
  getFooter = () => {
    saveMaps(this.props.uzLang, this.props.enLang)
      .then((res) =>
        this.setState({
          maps: res.data[0],
        })
      )
      .catch((res) => console.log("kechirasiz"));

    saveNumber()
      .then((res) =>
        this.setState({
          numbers: res.data,
        })
      )
      .catch((res) => console.log("xato"));
  };
  componentDidMount() {
    this.getFooter();
  }

  render() {
    const { maps, numbers } = this.state;
    const { uzLang, enLang } = this.props;
    return (
      <footer>
        <div className="container pt-5">
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className="row py-5 row-footer"
          >
            <div className="col-lg-4">
              <h6>
                {uzLang ? "TIZIM HAQIDA" : enLang ? "ABOUT US" : "О СИСТЕМЕ"}
              </h6>
              <div className="bottom"></div>
              <p className="my-4 py-2 mb-5">
                {uzLang
                  ? "University Profile System axborot tizimi"
                  : enLang
                  ? "University Profile System information system"
                  : "Информационная система University Profile System"}
              </p>
            </div>
            <div className="col-lg-4 mycol4">
              <div>
                <h6>
                  {uzLang
                    ? "FOYDALI HAVOLALAR"
                    : enLang
                    ? "USEFUL LINKS"
                    : "ПОЛЕЗНЫЕ ССЫЛКИ"}
                </h6>
                <div className="bottom"></div>
                <ul className="p-0 my-4">
                  <li>
                    <a href="http://jurnal.tiiame.uz/oz/">
                      {uzLang
                        ? '"Irrigatsiya va melioratsiya" ilmiy-texnik jurnali'
                        : enLang
                        ? 'Scientific and technical journal "Irrigation and Land Reclamation"'
                        : 'Научно-технический журнал "Ирригация и мелиорация"'}
                    </a>
                    <i className="fas fa-chevron-right float-end"></i>
                  </li>
                  <li>
                    <a href="http://sa.tiiame.uz/">
                      {uzLang
                        ? '"Barqaror qishloq xo`jaligi" ilmiy-texnik jurnali'
                        : enLang
                        ? 'Scientific and technical journal "Sustainable Agriculture"'
                        : 'Научно-технический журнал "Устойчивое сельское хозяйство"'}
                    </a>
                    <i className="fas fa-chevron-right float-end"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 pb-5">
              <div className="contacts">
                <h6>
                  {uzLang ? "BOG`LANISH" : enLang ? "OUR CONTACTS" : "КОНТАКТЫ"}
                </h6>
                <div className="bottom"></div>
                <p className="mt-5 ">
                  <i className="fas  fa-map-marker-alt myicon"></i>
                  <a href={maps.link} className="maps" target="_blank">
                    {" "}
                    {maps.name}
                  </a>
                </p>
                <p className="d-flex align-items-center">
                  <i className="fas fa-phone-alt myicon"></i>

                  <div>
                    {numbers.map((item, index) => (
                      <p className="m-0 " key={index}>
                        <p className="d-block ">{"  " + item.phone + " "}</p>
                      </p>
                    ))}
                  </div>
                </p>
                <p className="d-flex align-items-center">
                  <i className="fas fa-phone-alt myicon"></i>
                  <p className="m-0">
                    <a href="https://admin@tiiame.uz" className="maps">
                      admin@tiiame.uz
                    </a>{" "}
                    <br />{" "}
                    <a className="maps" href="https://www.tiiame.uz">
                      www.tiiame.uz
                    </a>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="section-footer">
          <div className="container">
            <div className="row row-footer p-2 justify-content-between">
              <div className="col-lg-6 py-3 col-md-6">
                <p className="pp">
                  {uzLang
                    ? "©University Profile System. Barcha huquqlar himoyalangan."
                    : enLang
                    ? "©University Profile System. All rights reserved."
                    : "©University Profile System. Все права защищены."}
                </p>
              </div>
              <div className="col-lg-4 py-3 col-md-6 footericons">
                <p>
                  {" "}
                  <a href="https://t.me/Mustafoali_7">
                    <i className="fab fa-telegram "></i>
                  </a>
                  <a href="https://www.facebook.com/alimardon.mustafoqulov.1">
                    <i className="fab fa-facebook"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
  Footer
);
