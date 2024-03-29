import React, { Component } from "react";
import AsisentPages from "./AsisentPages";
import ProfilPages from "./ProfilPages";
import ReactPaginate from "react-paginate";
import s from "../css/Homepage.module.css";
import { connect } from "react-redux";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import axios from "axios";
import { host } from "../config/host";
import style1 from "../css/Navbar1.module.css";
import Elon from "./Elon";
class Videolar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 8,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    axios.get(`${host}/videos/`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((item, uz, en) => {
        return item.file != null ? (
          <div
            className={style1.card11}
            data-aos="zoom-in"
            data-aos-duration="3000"
          >
            <video controls width="100%">
              <source src={item.file} type="video/mp4"></source>
            </video>
            <h4 className="text-center mt-2">
              {item.name == null ? " " : item.name}
            </h4>
          </div>
        ) : (
          <div
            className={style1.card11}
            data-aos="zoom-in"
            data-aos-duration="3000"
          >
            <iframe
              width="100%"
              height="450"
              src={item.link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h4 className="text-center mt-2">
              {item.name == null ? " " : item.name}
            </h4>
          </div>
        );
      });
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
      });
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData(this.props.uzLang, this.props.enLang);
  }
  render() {
    const { uzLang, enLang } = this.props;
    return (
      <>
        <div className="container">
          <div className="row my-5">
            {/* <div className="col-lg-1"></div> */}
            <div className="col-lg-8 overflow-hidden">
              <h4 className={s.izoh}>
                {" "}
                <i className="fa fa-file-video"></i>{" "}
                {uzLang
                  ? "Videolar ro`yxati"
                  : enLang
                  ? "List of Videos"
                  : "Список видеоуроков"}
              </h4>
              <div>{this.state.postData}</div>
              <div className="d-flex w-100% paginates">
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  className={s.pagination}
                />
              </div>
            </div>
            <div
              className="col-lg-4 "
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <Elon />
            </div>
          </div>
        </div>
      </>
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
  Videolar
);
