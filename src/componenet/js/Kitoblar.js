import React, { Component } from "react";
import ProfilPages from "../js/ProfilPages";
import AsisentPages from "../js/AsisentPages";
import { Table } from "react-bootstrap";
import s from "../css/Homepage.module.css";
import ReactPaginate from "react-paginate";

import { host1, hosten, hostru } from "../config/host";
import { connect } from "react-redux";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { saveBooks } from "../config/tuitor";
import Elon from "./Elon";
class Kitoblar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  
  receivedData(uz, en) {
    saveBooks(uz, en).then((res) => {
      // console.log(res.data);
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((item, uz, en) => {
        return item.file != null ? (
          <React.Fragment>
            <tr className="tables">
              <td>{item.count}</td>
              <td>
                <a download href={`${host1}${item.file}`}>
                  {item.name}
                  <span
                    className="badge badge-primary mydownload"
                    id={s.mydownload}
                  >
                    download
                  </span>
                </a>
              </td>
              <td>
                <a> </a>
              </td>
            </tr>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <tr className="tables">
              <td></td>
              <td>
                <a>{item.name}</a>
              </td>
              <td>
                <a href={item.link} className="links">
                  {this.uzLang ? "Ochish" : this.enLang ? "View" : "Открыть"}
                </a>
              </td>
            </tr>
          </React.Fragment>
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
    const { count } = this.state;
    const { uzLang, enLang } = this.props;
    return (
      <>
        <div className="container">
          <div className="row my-5">
            <div className="col-lg-8">
              <p className={s.izoh}>
                <i className="fas fa-book"></i>{" "}
                {uzLang
                  ? "Uslubiy ro'yxati"
                  : enLang
                  ? " List of methodical works"
                  : "Список методических работ"}
              </p>

              <Table
                striped
                bordered
                hover
                size="lg"
                text="center"
                className="tables"
                id={s.tables}
              >
                <thead>
                  <tr>
                    <th>
                      {uzLang ? "MUQOVASI" : enLang ? "COVER" : "ОБЛОЖКА"}
                    </th>
                    <th className="w-75">
                      {uzLang
                        ? "TO`LIQ NOMI"
                        : enLang
                        ? "FULL TITLE"
                        : "ПОЛЬНОЕ НАЗВАНИЕ"}
                    </th>
                    <th>{uzLang ? "HAVOLA" : enLang ? "LINK" : "ССЫЛКА"}</th>
                  </tr>
                </thead>
                <tbody>{this.state.postData}</tbody>
              </Table>
              <div className="d-flex w-100% paginates" id={s.paginates}>
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
            <div className="col-lg-4">
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
  Kitoblar
);
