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
import { saveBaholash, saveFansn } from "../config/tuitor";

class Navbar1 extends Component {
  state = {
    data: [],
    malumot: {},
    star: 0,
    comment: "",
    key: 0,
    nomi: "Barcha kitoblar",
    demo: 0,
    natija: 0,
    umumiyIzoh: [],
    izohlar: {
      star: 0,
      comment: "",
      subject: 0,
    },
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
    this.getBaholash();
  };

  getMalumot = (key) => {
    const result = this.state.data.filter((item) => item.id == key);
    this.setState({ malumot: result[0], nomi: result[0].name });
    console.log(this.state.malumot);
  };
 
 
 


// fan namuna
  syllabuys = () => {
    document.querySelector("#accordionExample").innerHTML = " ";

    this.state.malumot.syllabuys.map((item) => {
      document.querySelector(
        "#accordionExample"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
  <div style="width: 80%;
  border-radius: 20px;margin:auto;text-align:center;
  padding: 20px;
  background-color: rgba(0, 255, 255, 0.603);
  display: block;">
    ${item.name}
    <hr/>
    <div style="margin:auto;text-align:center">${item.date_published}</div>
    <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
  </div>
  </div>`
});
};
mustaqiltalim= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.mustaqiltalim.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};

maruzavaprezentatsiyalar= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.maruzavaprezentatsiyalar.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
laboratoriyaishlari= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.laboratoriyaishlari.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
amaliydarsmateriallari= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.amaliydarsmateriallari.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
hisobgrafikishlar= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.hisobgrafikishlar.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
kursishlari= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.kursishlari.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
topshiriqlar= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.topshiriqlar.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};
qoshimchahujjatlar= () => {
  document.querySelector("#accordionExample").innerHTML = " ";

  this.state.malumot.qoshimchahujjatlar.map((item) => {
    document.querySelector(
      "#accordionExample"
    ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_published}</div>
  <a href="${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`
});
};





handleChange1 = event => {
  this.setState({ comment: event.target.value });
}

handleSubmit1 = event => {
  event.preventDefault();

  const user = {
   "rate":this.state.star,
   "comment":this.state.comment
  };

  axios.post(`https://admin.credence.uz/uz/comments/`, user)
    .then(res => {
      console.log(res);
      console.log(res.data, user);
    }).catch(err=>{
      console.log("xato");
      console.log(user);
    })
}




  getBaholash = () => {
    saveBaholash()
      .then((res) => {
        this.setState({
          umumiyIzoh: res.data.comments,
          natija:res.data
        });
      })
      .catch((res) => {
        console.log("xato keldi");
      });
  };

  componentDidMount() {
    this.getFan(this.props.uzLang, this.props.enLang);
  }
  render() {
    const { uzLang, enLang } = this.props;
    const { umumiyIzoh, natija} = this.state;
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
                                 className={style1.dropbtn}
                                  id="nav-dropdown-button-drop-end"
                                  key="end"
                                  drop="end"
                                  title={item.name}
                                >
                                  <NavDropdown.Item 
                                   onClick={this.syllabuys}
                                  href="#action/3.1">
                                  syllabuys
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.mustaqiltalim}
                                    href="#action/3.2"
                                  >
                                    mustaqil talim
                                  </NavDropdown.Item>
                                  <NavDropdown.Item 
                                    onClick={this.maruzavaprezentatsiyalar}
                                  href="#action/3.3">
                                    maruza va prezentatsiyalar
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  
                                    onClick={this.laboratoriyaishlari}
                                  href="#action/3.3">
                                    laboratoriya ishlari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.amaliydarsmateriallari} href="#action/3.3">
                                  amaliy dars materiallari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.hisobgrafikishlar} href="#action/3.3">
                                  hisob grafik ishlar
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.kursishlari} href="#action/3.3">
                                  kurs ishlari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.topshiriqlar} href="#action/3.3">
                                  topshiriqlar
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.qoshimchahujjatlar} href="#action/3.3">
                                  qoshimcha hujjatlar
                                  </NavDropdown.Item>
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
                      <div className="my-2" id="demo11">
                        {this.state.nomi}
                      </div>
                    </h1>

                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8" id="accordionExample">
                          <Kitoblar />
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
                            {uzLang?"Izoh qoldirish":enLang?"Leave a comment":"Оставить комментарий"}
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ marginTop: "20px" }}>
                          {uzLang?"O`qituvchiga qoldirilgan izohlar":enLang?"Comments left to the teacher":"Комментарии оставлены учителю"}
                        </h4>
                        <div style={{ display: "flex" }}>
                          {natija.rating >= 1 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {natija.rating >= 2 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {natija.rating >= 3 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {natija.rating >= 4 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          {natija.rating >= 4.6 ? (
                            <FaStar style={{ color: "yellow" }} />
                          ) : (
                            <FaStar style={{ color: "black" }} />
                          )}
                          <p style={{ marginLeft: "10px" }}>
                            {natija.rating}
                            {console.log(natija.rating)}
                          </p>
                        </div>
                        {umumiyIzoh.map((item, index) => (
                          <div className={style1.card11} key={index}>
                            <h5>
                              <div style={{ display: "flex" }}>
                                {item.rate >= 1 ? (
                                  <FaStar style={{ color: "yellow" }} />
                                ) : (
                                  <FaStar style={{ color: "black" }} />
                                )}
                                {item.rate >= 2 ? (
                                  <FaStar style={{ color: "yellow" }} />
                                ) : (
                                  <FaStar style={{ color: "black" }} />
                                )}
                                {item.rate >= 3 ? (
                                  <FaStar style={{ color: "yellow" }} />
                                ) : (
                                  <FaStar style={{ color: "black" }} />
                                )}
                                {item.rate >= 4 ? (
                                  <FaStar style={{ color: "yellow" }} />
                                ) : (
                                  <FaStar style={{ color: "black" }} />
                                )}
                                {item.rate >= 4.6 ? (
                                  <FaStar style={{ color: "yellow" }} />
                                ) : (
                                  <FaStar style={{ color: "black" }} />
                                )}{" "}
                                <p
                                  style={{
                                    marginLeft: "30px",
                                    fontSize: "20px",
                                  }}
                                >
                                  {item.rate}
                                </p>
                              </div>
                            </h5>
                            <p>{item.comment}</p>
                            <p
                              style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "30px",
                              }}
                            >
                              {item.date_added}
                            </p>
                          </div>
                        ))}
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
                          <Form className="p-3" >
                            <div className="mb-3">
                              Baholash
                              <div
                                className={style1.star}
                                
                              >
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
                                <p
                                  style={{ paddingLeft: "10px" }}
                                >
                                  {this.state.star} ball
                                </p>
                              </div>
                            </div>
                            <Form.Group controlId="comment" className="mb-3" onSubmit={this.handleSubmit1}>
                              <Form.Label>
                                {uzLang
                                  ? "Shaxsiy fikringizni bildiring."
                                  : enLang
                                  ? "Message"
                                  : "Сообщение"}
                              </Form.Label>
                              <Form.Control
                              onChange={this.handleChange1}
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
                              data-bs-dismiss="modal"
                              onClick={this.handleSubmit1}
                            >
                              {uzLang
                                ? "Jo`natish"
                                : enLang
                                ? "Save"
                                : "Спасти"}
                            </Button>
                            <Button
                              variant="success"
                              className="mx-2 float-end"
                              data-bs-dismiss="modal"
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
