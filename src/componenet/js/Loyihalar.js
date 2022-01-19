import React, { Component } from "react";
import AsisentPages from "./AsisentPages";
import ProfilPages from "./ProfilPages";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import s from "../css/Homepage.module.css";
import { connect } from "react-redux";
import {uzLanguege} from '../redux/Actions/uzLanguege';
import {ruLanguege} from '../redux/Actions/ruLanguege';
import {enLanguege} from '../redux/Actions/enLanguege';
import { saveProjects } from "../config/tuitor";
import { host, hosten, hostru } from "../config/host";
import Elon from "./Elon";
class Loyihalar extends Component {
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
  receivedData(uz,en) {
    saveProjects(uz,en).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((item,uz,en) => {
        return item.file != null ? (
          <React.Fragment>
            <tr className="tables">
              <td>{item.count}</td>
              <td>
              <a download href={uz?`${host}/projects/`+item.slug+"/download":en?`${hosten}/projects/`+item.slug+"/download":`${hostru}/projects/`+"/"+item.slug+"/download"}>
                  {item.name}
                  <span className='badge badge-primary mydownload' id={s.mydownload}>download</span>
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
              <td>{item.count}</td>
              <td>
                <a>{item.name}</a>
              </td>
              <td>
                <a href={item.link} className='links'>{this.uzLang?"Ochish":this.enLang?"View":"Открыть"}</a>
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
    const {uzLang, enLang} = this.props;
    return (
      <>
        <AsisentPages />
        <div className="container">
          <div className="row my-5">
            <div className="col-lg-2">
              <ProfilPages />
            </div>
            <div className="col-lg-7 mycollg7" id={s.mycollg7}>
              <p className={s.izoh}>
                {" "}
                <i className="fa fa-file-archive"></i> {uzLang?"Loyihalar ro`yxati":enLang?"List of Projects":" Спсок проектов"}
              </p>
              <Table
                striped
                bordered
                hover
                size="xl"
                text="center"
                className="tables mt-4"
              >
                <thead>
                  <tr>
                  <th>#</th>
                    <th>{uzLang?"TO`LIQ NOMI":enLang?"FULL TITLE":"ПОЛЬНОЕ НАЗВАНИЕ"}</th>
                    <th>{uzLang?"HAVOLA":enLang?"LINK":"ССЫЛКА"}</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.postData}
                </tbody>
              </Table>

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
            <div className="col-lg-3">
                <Elon/>
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

export default connect(mapStateToProps, {uzLanguege,  ruLanguege, enLanguege })(Loyihalar);