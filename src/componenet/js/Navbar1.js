import React, { Component } from "react";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { connect } from "react-redux";
import { host } from "../config/host";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import style1 from "../css/Navbar1.module.css";
import Elon from "./Elon";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../img/logo.png";
import Section from "../js/Section";
import Kitoblar from "../js/Kitoblar";
import Loyihalar from "./Loyihalar";
import Taqdimotlar from "./Taqdimotlar";
import Videolar from "./Videolar";
import Maqolalar from "./Maqolalar";
import { Button, Form } from "react-bootstrap";
import { getPostsComments, saveFansn } from "../config/tuitor";

class Navbar1 extends Component {
  state = {
    data: [],
    malumot: {},
    star: 0,
    books: [],
    articles: [],
    projects: [],
    presentations: [],
    key: 0,
    comment: "",
    natija: 4.4,
    close: false,
  };

  star1 = () => {
    this.setState({ star: 1 });
    console.log(this.state.star);
    document.querySelector("#star1").style = "color:yellow";
    document.querySelector("#star2").style = "color:none";
    document.querySelector("#star3").style = "color:none";
    document.querySelector("#star4").style = "color:none";
    document.querySelector("#star5").style = "color:none";
  };
  star2 = () => {
    this.setState({ star: 2 });
    console.log(this.state.star);
    document.querySelector("#star1").style = "color:yellow";
    document.querySelector("#star2").style = "color:yellow";
    document.querySelector("#star3").style = "color:none";
    document.querySelector("#star4").style = "color:none";
    document.querySelector("#star5").style = "color:none";
  };
  star3 = () => {
    this.setState({ star: 3 });
    console.log(this.state.star);
    document.querySelector("#star1").style = "color:yellow";
    document.querySelector("#star2").style = "color:yellow";
    document.querySelector("#star3").style = "color:yellow";
    document.querySelector("#star4").style = "color:none";
    document.querySelector("#star5").style = "color:none";
  };
  star4 = () => {
    this.setState({ star: 4 });
    console.log(this.state.star);
    document.querySelector("#star1").style = "color:yellow";
    document.querySelector("#star2").style = "color:yellow";
    document.querySelector("#star3").style = "color:yellow";
    document.querySelector("#star4").style = "color:yellow";
    document.querySelector("#star5").style = "color:none";
  };
  star5 = () => {
    console.log(this.state.star);
    this.setState({ star: 5 });
    document.querySelector("#star1").style = "color:yellow";
    document.querySelector("#star2").style = "color:yellow";
    document.querySelector("#star3").style = "color:yellow";
    document.querySelector("#star4").style = "color:yellow";
    document.querySelector("#star5").style = "color:yellow";
  };

  handleChange = (value) => {
    if (value.target.value === "UZ") {
      this.props.uzLanguege();
      window.location.reload();
    } else if (value.target.value === "RU") {
      this.props.ruLanguege();
      window.location.reload();
    } else if (value.target.value === "EN") {
      this.props.enLanguege();
      window.location.reload();
    }
  };

  getFan = (uz,en) => {
    saveFansn(uz,en).then((res) => {
      this.setState({ data: res.data });
    });
  };
  getMalumot = (id) => {
    axios.get(`https://admin.credence.uz/en/subjects/${id}/`).then((res) => {
      this.setState({
        malumot: res.data,
        books: res.data.books,
        key: id,
        articles: res.data.articles,
        projects: res.data.projects,
        presentations: res.data.presentations,
      });
      console.log(this.state.malumot);
    });
  };
  onchangeM = () => {
    this.setState({
      comment: document.querySelector("#exampleFormControlTextarea1").value,
    });
    console.log(this.state.comment);
  };
  putIzoh = () => {
    var manba = {
      rate: this.state.star,
      comment: document.querySelector("#holl").value,
    };
    getPostsComments(manba)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log("error");
      });
  };

  // addComments=(e)=>{
  //   e.preventDefault();
  //   const commentData = new commentData(e.target),
  //   commentsDataObj=Object.commentEntries(commentData.entries());
  //   getPostsComments(commentsDataObj).then((res)=>{
  //     if (res && res.data) {
  //       // toast.success('Yes')
  //      alert('Yuborildi')
  //     } else {
  //       // toast.error('No')
  //       alert('Yuborilmadi')
  //     }
  //   }).catch((res)=>{
  //     alert("xato")
  //   })
  // }

  componentDidMount() {
    this.getFan(this.props.uzLang,this.props.enLang);
  }
  render() {
    const { uzLang, enLang } = this.props;
    return (
      <div>
        <BrowserRouter>
          <header>
            <div className="container">
              <div className="row py-2 justify-content-between">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <a href="http://staff.tiiame.uz/" className={style1.linkLogo}>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div className="logo">
                        <img height="70px" src={logo} alt="logo" />
                      </div>
                      <div className={style1.logoh6}>
                        <h6>
                          {uzLang
                            ? "“TOSHKENT IRRIGATSIYA VA QISHLOQ XO`JALIGINI MEXANIZATSIYALASH MUHANDISLARI INSTITUTI” MILLIY TADQIQOT UNIVERSITETI"
                            : enLang
                            ? "TASHKENT INSTITUTE OF IRRIGATION AND AGRICULTURAL ENGINEERING ENGINEERS NATIONAL RESEARCH UNIVERSITY"
                            : "ТАШКЕНТСКИЙ ИНСТИТУТ ИНЖЕНЕРОВ СЕЛЬСКОХОЗЯЙСТВЕННОГО МАШИНОСТРОЕНИЯ НАЦИОНАЛЬНЫЙ ИССЛЕДОВАТЕЛЬСКИЙ УНИВЕРСИТЕТ"}
                        </h6>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 d-flex justify-content-end align-items-center">
                  <div>
                    <a href={`${host}/admin/`}>
                      <i className="fa fa-user"></i>
                      {uzLang ? "Kirish" : enLang ? "Login" : "Войти"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <nav className="navbar navbar-expand-lg navbar-light bg-success sticky-top">
            <div className="container py-2">
              <ul className="navbar-nav">
                <li id={style1.navitem} className="nav-item">
                  <Link
                    to="/"
                    id={style1.navlink}
                    className="nav-link active sahifa"
                    aria-current="page"
                  >
                    {uzLang ? "Bosh sahifa" : enLang ? "Home" : "Главная"}
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                <div className="navbar-toggler mx-2 mySelect2">
                  <select
                    value={uzLang ? "UZ" : enLang ? "EN" : "RU"}
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    onChange={this.handleChange}
                  >
                    <option value="UZ" name="UZ">
                      UZB
                    </option>
                    <option value="EN" name="EN">
                      ENG
                    </option>
                    <option value="RU" name="RU">
                      РУС
                    </option>
                  </select>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fas fa-bars" style={{ color: "black" }}></i>
                </button>
              </div>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li id={style1.navitem} className="nav-item">
                    <Link
                      to="/Maqolalar"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang ? "Maqolalar" : enLang ? "Articles" : "Статьи"}
                    </Link>
                  </li>
                  <li id={style1.navitem} className="nav-item">
                    <Link
                      to="/Kitoblar"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang ? "Kitoblar" : enLang ? "Books" : "Книги"}
                    </Link>
                  </li>
                  <li id={style1.navitem} className="nav-item">
                    <Link
                      to="/taqdimotlar"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang
                        ? "Taqdimotlar"
                        : enLang
                        ? "Presentations"
                        : "Презентации"}
                    </Link>
                  </li>
                  <li id={style1.navitem} className="nav-item">
                    <Link
                      to="/loyihalar"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang ? "Loyihalar" : enLang ? "Projects" : "Проекты"}
                    </Link>
                  </li>

                  <li id={style1.navitem} className="nav-item">
                    <Link
                      to="/videolar"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang ? "Videolar" : enLang ? "Videos" : "Видеоуроки"}
                    </Link>
                  </li>
                  <li id={style1.navitem} className="nav-item">
                    <div className={style1.dropdown}>
                      <button className={style1.dropbtn}>
                        {uzLang ? "Fanlar" : enLang ? "Subjects" : "Предметы"}
                      </button>
                      <div
                        id={style1.dropdowncontent}
                        className="dropdown-content fanlar"
                      >
                        {this.state.data.map((item) => {
                          return (
                            <div>
                              
                              <Link
                                to="/fanlar"
                                onClick={() => this.getMalumot(item.id)}
                              >
                                {item.name}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                  <li id={style1.navitem} className="nav-item">
                    <a
                      href="#footer"
                      id={style1.navlink}
                      className="nav-link"
                      aria-current="page"
                    >
                      {uzLang ? "Bog'lanish" : enLang ? "Contact" : "Контакты"}
                    </a>
                  </li>
                </ul>
                <div className={style1.mySelect}>
                  <select
                    value={uzLang ? "UZ" : enLang ? "EN" : "RU"}
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    onChange={this.handleChange}
                  >
                    <option value="UZ" name="UZ">
                      UZB
                    </option>
                    <option value="EN" name="EN">
                      ENG
                    </option>
                    <option value="RU" name="RU">
                      РУС
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route exact path="/" element={<Section />} />
            <Route path="/Maqolalar" element={<Maqolalar />} />
            <Route path="/Kitoblar" element={<Kitoblar />} />
            <Route path="/taqdimotlar" element={<Taqdimotlar />} />
            <Route path="/loyihalar" element={<Loyihalar />} />
            <Route path="/videolar" element={<Videolar />} />
            <Route
              path="/fanlar"
              element={
                <div>
                  <div className="mt-5 mb-5 fan1">
                    <h1 className={style1.text}>
                    { this.state.data.map((item) => {
                          return (
                            <div className='my-2'>
                                {item.name}
                              
                            </div>
                          );
                        })}
                       </h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingTwo">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  {uzLang?"Maqolalar":enLang?"Articles":"Cтатьи"}
                                </button>
                              </h2>
                              <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {this.state.articles.length == 0 ? (
                                    <h5>{uzLang?"hozircha malumot topilmadi":enLang?"No information found yet":"Информация пока не найдена"}</h5>
                                  ) : (
                                    this.state.articles.map((item) => {
                                      return (
                                        <table className="table table-striped">
                                          <thead>{item.name}</thead>
                                          <tbody>
                                            {item.slug}
                                            <a
                                              href={
                                                `https://admin.credence.uz/en/subjects/${this.state.key}/` +
                                                `${item.file}`
                                              }
                                            >
                                              {uzLang?" yuklab olish":enLang?" download":"  скачать"}
                                            </a>
                                            <tr>
                                              <td colspan="4">
                                                <table className="table mb-0">
                                                  {item.file}
                                                </table>
                                              </td>
                                            </tr>
                                            {item.date_published}
                                          </tbody>
                                        </table>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  {uzLang?"Kitoblar":enLang?"Books":"Книги"}
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {this.state.books.length == 0 ? (
                                    <h5>hozrcha malumot topilmadi</h5>
                                  ) : (
                                    this.state.books.map((item) => {
                                      return (
                                        <table className="table table-striped">
                                          <thead>{item.slug}</thead>
                                          <tbody>
                                            {item.name}
                                            <tr>
                                              <td colspan="4">
                                                <table className="table mb-0">
                                                  {item.file}
                                                </table>
                                              </td>
                                            </tr>
                                            {item.date_published}
                                          </tbody>
                                        </table>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="headingThree"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  {uzLang
                        ? "Taqdimotlar"
                        : enLang
                        ? "Presentations"
                        : "Презентации"}
                                </button>
                              </h2>
                              <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {this.state.presentations.length == 0 ? (
                                    <h5>hozrcha malumot topilmadi</h5>
                                  ) : (
                                    this.state.presentations.map((item) => {
                                      return (
                                        <table className="table table-striped">
                                          <thead>{item.slug}</thead>
                                          <tbody>
                                            {item.name}
                                            <tr>
                                              <td colspan="4">
                                                <table className="table mb-0">
                                                  {item.file}
                                                </table>
                                              </td>
                                            </tr>
                                            {item.date_published}
                                          </tbody>
                                        </table>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingFour">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseFour"
                                  aria-expanded="false"
                                  aria-controls="collapseFour"
                                >
                                  {uzLang ? "Loyihalar" : enLang ? "Projects" : "Проекты"}
                                </button>
                              </h2>
                              <div
                                id="collapseFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFour"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {this.state.projects.length == 0 ? (
                                    <h5>hozrcha malumot topilmadi</h5>
                                  ) : (
                                    this.state.projects.map((item) => {
                                      return (
                                        <table className="table table-striped">
                                          <thead>{item.slug}</thead>
                                          <tbody>
                                            {item.name}
                                            <tr>
                                              <td colspan="4">
                                                <table className="table mb-0">
                                                  {item.file}
                                                </table>
                                              </td>
                                            </tr>
                                            {item.date_published}
                                          </tbody>
                                        </table>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <Elon />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Izoh qoldirish
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ marginTop: "20px" }}>
                          O`qituvchiga qoldirilgan izohlar
                        </h4>
                        <div style={{ display: "flex" }}>
                          {this.state.natija >= 1 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {this.state.natija >= 2 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {this.state.natija >= 3 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {this.state.natija >= 4 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {this.state.natija == 4.6 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}{" "}
                          <p style={{ marginLeft: "10px" }}>
                            {this.state.natija}
                          </p>
                        </div>
                        <div className={style1.card11}>
                          <h5>
                            <div style={{ display: "flex" }}>
                              {this.state.natija >= 1 ? (
                                <FaStar style={{ color: "yellow" }} />
                              ) : (
                                <FaStar style={{ color: "black" }} />
                              )}
                              {this.state.natija >= 2 ? (
                                <FaStar style={{ color: "yellow" }} />
                              ) : (
                                <FaStar style={{ color: "black" }} />
                              )}
                              {this.state.natija >= 3 ? (
                                <FaStar style={{ color: "yellow" }} />
                              ) : (
                                <FaStar style={{ color: "black" }} />
                              )}
                              {this.state.natija >= 4 ? (
                                <FaStar style={{ color: "yellow" }} />
                              ) : (
                                <FaStar style={{ color: "black" }} />
                              )}
                              {this.state.natija == 4.6 ? (
                                <FaStar style={{ color: "yellow" }} />
                              ) : (
                                <FaStar style={{ color: "black" }} />
                              )}{" "}
                              <p
                                style={{ marginLeft: "30px", fontSize: "20px" }}
                              >
                                {this.state.natija}
                              </p>
                            </div>
                          </h5>
                          <p>
                            rahmat domla borizga shukur yaxshiyam siz borsiz{" "}
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "30px",
                            }}
                          >
                            12-12-1998
                          </p>
                        </div>
                      </div>
                    </div>


                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <Form className="p-3">
                            <div className="mb-3">
                              Baholash
                              <div className={style1.star}>
                                <FaStar
                                  id="star1"
                                  onClick={() => this.star1()}
                                />
                                <FaStar
                                  id="star2"
                                  onClick={() => this.star2()}
                                />
                                <FaStar
                                  id="star3"
                                  onClick={() => this.star3()}
                                />
                                <FaStar
                                  id="star4"
                                  onClick={() => this.star4()}
                                />
                                <FaStar
                                  id="star5"
                                  onClick={() => this.star5()}
                                />{" "}
                                <p style={{ paddingLeft: "10px" }}>
                                  {this.state.star} ball
                                </p>
                              </div>
                            </div>
                            <Form.Group controlId="message" className="mb-3">
                              <Form.Label>
                                {uzLang
                                  ? "Shaxsiy fikringizni bildiring."
                                  : enLang
                                  ? "Message"
                                  : "Сообщение"}
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                name="message"
                                rows={3}
                                id="holl"
                                placeholder="Murojat matni..."
                              />
                            </Form.Group>
                            <Button
                              onClick={this.putIzoh}
                              variant="success"
                              type="submit"
                              className="float-end"
                            >
                              {uzLang
                                ? "Jo`natish"
                                : enLang
                                ? "Save"
                                : "Спасти"}
                            </Button>
                            <Button
                              variant="success"
                              type="reset"
                              className="mx-2 float-end"
                            >
                              {uzLang
                                ? "Tozalash"
                                : enLang
                                ? "Clear"
                                : "Очистить"}
                            </Button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
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
  Navbar1
);
