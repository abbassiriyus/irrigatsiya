import React, { Component } from "react";
import { Link, Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { connect } from "react-redux";
import { host, host1 } from "../config/host";
import axios from "axios";
import { hosten, hostru } from "../config/host";
import { saveBooks } from "../config/tuitor";
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
import { Button, Container, Form, Nav, Navbar, NavDropdown, Table } from "react-bootstrap";
import { saveBaholash, saveFansn } from "../config/tuitor";
import ReactPaginate from "react-paginate";
import s from "../css/Homepage.module.css";

class Navbar1 extends Component {
  state = {
    offset: 0,
    data: [],
    perPage: 10,
    currentPage: 0,
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

  receivedData(uz, en) {
    saveBooks(uz, en).then((res) => {
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
                <a
                  download
                  href={
                    uz
                      ? `${host}/books/` + item.slug + "/download"
                      : en
                      ? `${hosten}/books/` + item.slug + "/download"
                      : `${hostru}/books/` + "/" + item.slug + "/download"
                  }
                >
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
  syllabus = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.syllabus.map((item) => {
      return item.file !== null?( document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
  <div style="width: 80%;
  border-radius: 20px;margin:auto;text-align:center;
  padding: 20px;
  background-color: rgba(0, 255, 255, 0.603);
  display: block;">
    ${item.name}
    <hr/>
    <div style="margin:auto;text-align:center">${item.date_added}</div>
    <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Yuklab olish</button></a>
  </div>
  </div>`):( document.querySelector(
    "#funksiya"
  ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a  href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
    });
  };
  mustaqil_talim = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.mustaqil_talim.map((item) => {
      return item.file !== null? ( document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(
  document.querySelector(
    "#funksiya"
  ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`
)
     
    });
  };

  maruza_va_prezentatsiyalar = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.maruza_va_prezentatsiyalar.map((item) => {
      return item.file !== null? ( document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(
  document.querySelector(
    "#funksiya"
  ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`
)
    });
  };
  laboratoriya_ishlari = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.laboratoriya_ishlari.map((item) => {
      return item.file !== null?(document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
    });
  };
  amaliy_dars_materiallar = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.amaliy_dars_materiallar.map((item) => {
      return item.file !== null ? (document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">link</button></a>
</div>
</div>`)
    });
  };




  hisob_grafik_ishlar = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.hisob_grafik_ishlar.map((item) => {
      return item.file !== null? (document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
      
    });
  };
  kursishlari = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.kurs_ishlari.map((item) => {

      return item.file !== null? (document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
    });
  };
  topshiriqlar = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.topshiriqlar.map((item) => {


      return item.file !== null? (document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
    });
  };
  qoshimcha_hujjatlar = () => {
    document.querySelector("#funksiya").innerHTML = " ";

    this.state.malumot.qoshimcha_hujjatlar.map((item) => {

      return item.file !== null? (document.querySelector(
        "#funksiya"
      ).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
  ${item.name}
  <hr/>
  <div style="margin:auto;text-align:center">${item.date_added}</div>
  <a download href="${host1}${item.file}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">yuklab olish</button></a>
</div>
</div>`):(document.querySelector(
  "#funksiya"
).innerHTML += ` <div style="width:100%;margin:40px ; display:flex; justify-content:center;align-items:center;">
<div style="width: 80%;
border-radius: 20px;margin:auto;text-align:center;
padding: 20px;
background-color: rgba(0, 255, 255, 0.603);
display: block;">
${item.name}
<hr/>
<div style="margin:auto;text-align:center">${item.date_added}</div>
<a href="${item.link}" style="margin:auto;textAlign:center;width:100%;display:flex;justify-content:center;margin-top:30px; text-decoration: none;"><button style="background-color:#0D6EFD;color:#ffffff;font-weight:500;padding:10px;border:none;border-radius:10px;">Link</button></a>
</div>
</div>`)
    });
  };

  handleChange1 = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit1 = (event) => {
    event.preventDefault();

    const user = {
      rate: this.state.star,
      comment: this.state.comment,
    };
    window.location.reload();

    axios
      .post(`https://admin.credence.uz/uz/comments/`, user)
      .then((res) => {
        if(res.data && res){

          alert("yuborildi")
        }else {
          alert("yuborilmadi")
        }
      })
      .catch((err) => {
        alert("Xato")
      });
  };

  getBaholash = () => {
    saveBaholash()
      .then((res) => {
        this.setState({
          umumiyIzoh: res.data.comments,
          natija: res.data,
        });
      })
      .catch((res) => {
        console.log("xato keldi");
      });
  };

  componentDidMount() {
    this.receivedData(this.props.uzLang, this.props.enLang);
    this.getFan(this.props.uzLang, this.props.enLang);
  }
  render() {
    const { uzLang, enLang } = this.props;
    const { umumiyIzoh, natija } = this.state;
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
<<<<<<< Updated upstream











          <nav className="navbar navbar-expand-lg navbar-light bg-success sticky-top">
=======
          <nav className="navbar mystiky navbar-expand-lg navbar-light bg-success">
>>>>>>> Stashed changes
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
                      <button href="/fanlar" className={style1.dropbtn}>
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
                                <NavDropdown
                                  className={style1.dropbtn}
                                  id="nav-dropdown-button-drop-end"
                                  key="end"
                                  drop="end"
                                  title={item.name}
                                >
<<<<<<< Updated upstream
                                  <NavDropdown.Item 
                                   onClick={this.syllabuys}
                                  href="/fanlar">
                                  syllabuys
=======
                                  <NavDropdown.Item
                                    onClick={this.syllabus}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Syllabuys"
                                      : enLang
                                      ? "syllabuys"
                                      : "Учебные программы"}
>>>>>>> Stashed changes
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.mustaqil_talim}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Mustaqil talim"
                                      : enLang
                                      ? "Independent learning"
                                      : "Самостоятельное обучение"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.maruza_va_prezentatsiyalar}
<<<<<<< Updated upstream
                                  href="/fanlar">
                                    maruza va prezentatsiyalar
=======
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Maruza va prezentatsiyalar"
                                      : enLang
                                      ? "Lectures and presentations"
                                      : "Лекции и презентации"}
>>>>>>> Stashed changes
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.laboratoriya_ishlari}
<<<<<<< Updated upstream
                                  href="/fanlar">
                                    laboratoriya ishlari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.amaliy_dars_materiallar} href="/fanlar">
                                  amaliy dars materiallari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.hisob_grafik_ishlar} href="/fanlar">
                                  hisob grafik ishlar
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.kursishlari} href="/fanlar">
                                  kurs ishlari
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.topshiriqlar} href="/fanlar">
                                  topshiriqlar
                                  </NavDropdown.Item>
                                  <NavDropdown.Item  onClick={this.qoshimcha_hujjatlar} href="/fanlar">
                                  qoshimcha hujjatlar
=======
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? " Laboratoriya ishlari"
                                      : enLang
                                      ? "Laboratory work"
                                      : "лабораторная работа"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.amaliy_dars_materiallar}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Amaliy dars materiallari"
                                      : enLang
                                      ? "Practical course materials"
                                      : "Практические материалы курса"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.hisob_grafik_ishlar}
                                    href="#action/3.3"
                                  >
                                    {uzLang
                                      ? "Hisob grafik ishlar"
                                      : enLang
                                      ? "Account graphics work"
                                      : "Работа с графикой аккаунта"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.kursishlari}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Kurs ishi"
                                      : enLang
                                      ? "Coursework"
                                      : "Курсовая работа"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={this.topshiriqlar}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Topshiriqlar"
                                      : enLang
                                      ? "Assignments"
                                      : "Задания"}
                                  </NavDropdown.Item>
                                  <NavDropdown.Item
                                    onClick={() => this.qoshimcha_hujjatlar}
                                    href="/fanlar"
                                  >
                                    {uzLang
                                      ? "Talabalar uchun"
                                      : enLang
                                      ? "For students"
                                      : "Для студентов"}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <div className="col-lg-8" id="accordionExample">
            



            
             
             
=======
                        <div className="col-lg-8" id="funksiya">
                          <p className={s.izoh}>
                            <i className="fas fa-book"></i>{" "}
                            {uzLang
                              ? "Kitoblar ro'yxati"
                              : enLang
                              ? " List of Books"
                              : "Список книг"}
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
                                  {uzLang
                                    ? "MUQOVASI"
                                    : enLang
                                    ? "COVER"
                                    : "ОБЛОЖКА"}
                                </th>
                                <th className="w-75">
                                  {uzLang
                                    ? "TO`LIQ NOMI"
                                    : enLang
                                    ? "FULL TITLE"
                                    : "ПОЛЬНОЕ НАЗВАНИЕ"}
                                </th>
                                <th>
                                  {uzLang
                                    ? "HAVOLA"
                                    : enLang
                                    ? "LINK"
                                    : "ССЫЛКА"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>{this.state.postData}</tbody>
                          </Table>
                          <div
                            className="d-flex w-100% paginates"
                            id={s.paginates}
                          >
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
>>>>>>> Stashed changes
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
                            {uzLang
                              ? "Izoh qoldirish"
                              : enLang
                              ? "Leave a comment"
                              : "Оставить комментарий"}
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ marginTop: "20px" }}>
                          {uzLang
                            ? "O`qituvchiga qoldirilgan izohlar"
                            : enLang
                            ? "Comments left to the teacher"
                            : "Комментарии оставлены учителю"}
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
                          <p style={{ marginLeft: "10px" }}>{natija.rating}</p>
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
                            <h2>
                              {uzLang
                                ? "O'qituvchilarni baholash"
                                : enLang
                                ? "Teacher evaluation"
                                : "Оценка учителя"}
                            </h2>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <Form className="p-3">
                            <div className="">
                              <p>
                                {" "}
                                {uzLang
                                  ? "Baholash"
                                  : enLang
                                  ? "Rating"
                                  : "Рейтинг"}
                              </p>
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
                                  {this.state.star}{" "}
                                  {uzLang ? "ball" : enLang ? "ball" : "мяч"}
                                </p>
                              </div>
                            </div>
                            <Form.Group
                              controlId="comment"
                              className=""
                              onSubmit={this.handleSubmit1}
                            >
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

                            <p
                              style={{
                                color: "red",
                                margin: "0px",
                                marginBottom: "15px",
                              }}
                            >
                              {uzLang
                                ? "Shaxsiy fikringizni qoldiring"
                                : enLang
                                ? "Leave your personal opinion"
                                : "Оставьте свое личное мнение"}
                            </p>
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
