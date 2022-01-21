import React, { Component } from "react";
import { Link, Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
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
import { Button, Form, NavDropdown } from "react-bootstrap";
import {  saveFansn } from "../config/tuitor";

class Navbar1 extends Component {
  state = {
    data: [],
    malumot: {},
    star: 0,
    comment: "",
    book: [],
    articles: [],
  projects: [],
    presentations: [],
    key: 0, 
    close: false,
    nomi:'Aniq bir fani kitiring iltimos',
    demo:0,
    natija: 4.4,
      izohlar:{
        star: 0,
      comment:"",
      }
   
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

  getFan = (uz, en) => {
    saveFansn(uz, en).then((res) => {
      this.setState({ data: res.data });
    });
  };
  getMalumot=(key)=>{
const result = this.state.data.filter(item => item.id==key);
this.setState({malumot:result[0] , nomi:result[0].name})
console.log(this.state.malumot)
  }
 book=()=>{
  document.querySelector('#accordionExample').innerHTML=" "

    this.state.malumot.books.map(item=>{
  document.querySelector('#accordionExample').innerHTML+=` <div style="width:100% ; display:flex; justify-content:center;align-items:center;">
  <div style="width: 80%;
  border-radius: 20px;
  padding: 20px;
  background-color: rgba(0, 255, 255, 0.603);
  display: block;">
    nomi:${item.name}
    <hr/>
    <div style="margin:auto;text-align:center">${item.date_published}</div>
    <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="padding:10px;border-radius:10px;">yuklab olish</button></a>
  </div>
  </div>`
})

}
 
  



  

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  };
  submitHandler=(e)=>{
    e.preventDefault()
  //  console.log(this.state)  
    const user = {
      comment:this.state.comment,
      star:this.state.star
    }
    axios.post('https://admin.credence.uz/uz/comments/').then(res=>{
      console.log(res)
    }).catch(error=>{
      console.log(error);
    })
  }



  







  componentDidMount() {
    this.getFan(this.props.uzLang, this.props.enLang);
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
                              href="/fanlar"
                                to="/fanlar"
                                onClick={() => this.getMalumot(item.id)}
                              >
                                 <NavDropdown
          id="nav-dropdown-button-drop-end"
          key="end"
        drop="end"
          title={item.name}
          menuVariant="light"
        >
          <NavDropdown.Item   href="/fanlar">Silabus</NavDropdown.Item>
          <NavDropdown.Item onClick={this.book} >Kitoblar</NavDropdown.Item>
          <NavDropdown.Item  href="/fanlar">Taqdimotlar</NavDropdown.Item>
          <NavDropdown.Item  href="/fanlar">Loyihalar</NavDropdown.Item>
          <NavDropdown.Item  href="/fanlar">Taqdimotlar</NavDropdown.Item>
          <NavDropdown.Item  href="/fanlar">Maqolalar</NavDropdown.Item>
        </NavDropdown>
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
            <Route path="*" element={<Navigate to="/" />} />
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
                    
                   
                            <div className='my-2' id="demo11">
                            <h1>{this.state.nomi}</h1>
                            </div>
                        
                       </h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8" id="accordionExample">
                  
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
                          <Form className="p-3" onSubmit={this.submitHandler}>
                            <div className="mb-3">
                              Baholash
                              <div className={style1.star} onChange={this.changeHandler}>
                                <FaStar
                                  id="star1"
                                  onClick={() => this.star1()}
                                  onChange={this.changeHandler}
                                />
                                <FaStar
                                  id="star2"
                                  onClick={() => this.star2()}
                                  onChange={this.changeHandler}
                                />
                                <FaStar
                                  id="star3"
                                  onClick={() => this.star3()}
                                  onChange={this.changeHandler}
                                />
                                <FaStar
                                  id="star4"
                                  onClick={() => this.star4()}
                                  onChange={this.changeHandler}
                                />
                                <FaStar
                                  id="star5"
                                  onClick={() => this.star5()}
                                  onChange={this.changeHandler}
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
                                onChange={this.changeHandler}
                                as="textarea"
                                name="comment"
                                rows={3}
                                id="holl"
                                placeholder="Murojat matni..."
                                value={this.state.comment}
                              />
                            </Form.Group>
                            <Button
                              
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
