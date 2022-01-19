import React, { Component } from "react";
import AsisentPages from "./AsisentPages";
import ProfilPages from "./ProfilPages";
import style2 from '../css/Section.module.css';
import { getPosts, saveTuitor } from "../config/tuitor";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Elon from "./Elon";
import MultipleItems from "./MultipleItems";
import rasm from '../img/rasm.gif'


class Section extends Component {
  state = {
    userdata: [],
    profiledata: [],
  
  };
  getSection = (uz,en) => {
    saveTuitor(uz,en)
    .then((res) => {
      this.setState({
        userdata: res.data,
        profiledata: res.data.user,
      });
      
    })
    .catch((res) => {
      
    });
    
  };

 
  componentDidMount() {
    this.getSection(this.props.uzLang,this.props.enLang);
  }

  addTodo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    
    getPosts(formDataObj)
      .then((res) => {
        if (res && res.data) {
          // toast.success('Yes')
         alert('Yuborildi')
        } else {
          // toast.error('No')
          alert('Yuborilmadi')
        }
      })
      .catch((res) => {
        alert("Xato");
      });
  };
  render() {
    const { userdata, profiledata } = this.state;
    const {uzLang, enLang} = this.props
    return (
      <>
        <AsisentPages />
        <div className="" style={{overflowX:'hidden'}}>
        <div className="container py-5">
          <div className="row my-5 pt-3">
            <div className="col-lg-2">
              <ProfilPages />
            </div>
            <div className="col-lg-7 bbbb" id={style2.bbbb}>
              <div>
                <div id={style2.malumot, style2.card, style2.cccc} className="card cccc p-4 malumot">
                  {
                    <div>
                      <h3>
                        {profiledata.last_name} {profiledata.first_name}
                      </h3>
                      <p>
                        <b>{uzLang?"Fakultet:":enLang?"Faculty:":"Факультет:"} </b>
                        {userdata.faculty} 
                      </p>
                      <p>
                        <b>{uzLang?"Kafedra:":enLang?"Department:":"Кафедра:"} </b> {userdata.cafedra}
                      </p>
                      <p>
                        <b>{uzLang?"Ilmiy daraja va unvon:":enLang?"Degree:":"Научная степень и звание :"} </b> {userdata.level}
                      </p>
                      <p>
                        <b>{uzLang?"E-pochta:":enLang?"Email:":"Э-почта:"} </b> {profiledata.email}
                      </p>
                      <hr />
                      <h5 className="py-3">{uzLang?"Qo`shimcha ma'lumotlar":enLang?"Additional information":"Дополнительная информация"}</h5>
                    </div>
                  }
                </div>

                <div class="row row-2 my-5 myrowbg" className={style2.row2} id={style2.myrowbg}>
                  <div className="col-lg-6 col-md-6">
                    <div class="card" className={style2.card}>
                      <p className="p-2">
                        <i className="fa fa-user" id={style2.fauser}></i> {uzLang?"Foydalanuvchi hisoblari":enLang?"User Accounts":" Аккаунты пользователя"}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div class="card" className={style2.card}>
                      <p className="p-2">
                        <i className="fa fa-signal" id={style2.fasignal}></i>
                        <a
                          class="index" className={style2.index}
                            href='/#'
                          >
                          {uzLang?"h-Indeksi":enLang?"Citations":"h-Показатель"}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="xabarlar mx-4" id={style2.xabarlar}>
                      <div>
                        <div className="div">
                          <i className="fa fa-envelope"></i>
                        </div>
                      </div>
                      <div className="mx-3">
                        <a
                     href={"mailto:"+`${profiledata.email}`}
                          className={style2.gmail}
                        >
                          {profiledata.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3'>
                   <Elon/>
              </div>
          </div>
        </div>
        </div>


        <div className={style2.images77} style={{overflowX:'hidden'}}>
                  <div className="row p-3">
                    <div style={{overflowX:'hidden'}}>
                    <MultipleItems/>
                    </div>
                  </div>
                  
                  
                
        </div>
        <div className="py-5">
          <div className="container">
          <div className="row my-5 justify-content-between">
                  <div className="col-lg-5 col-md-6 messegss" id={style2.messegss} data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" >
              <h3 className="text-center">{uzLang?"Xabar yuborish":enLang?"Send a message":"Отправить сообщение"}</h3>
              <Form onSubmit={(e) => this.addTodo(e)} >
                <Form.Group controlId="text">
                  <Form.Label>{uzLang?"F.I.O":enLang?"F.I.O":"Ф.И.О"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="F.I.O"
                  />
                </Form.Group>
                <Form.Group controlId="emai">
                  <Form.Label>{uzLang?"E-pochta":enLang?"Email":"Электронное письмо"}</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>{uzLang?"Tel: Raqam(Davlat kodi bilan kiritish talab qilinadi)":enLang?"Phone (Enter with country code required)":"Телефон (Введите код страны)"}</Form.Label>
                  <Form.Control type="text" name="phone" placeholder="tel: +99899 999 99 99" />
                </Form.Group>
                <Form.Group controlId="message" className='mb-3'>
                  <Form.Label>{uzLang?"Izohlar":enLang?"Message":"Сообщение"}</Form.Label>
                  <Form.Control as="textarea" name="message" rows={3} placeholder='Murojat matni...'/>
                </Form.Group>
                <Button variant="success" type="submit" className='float-end'>
                  {uzLang?"Jo`natish":enLang?"Save":"Спасти"}
                </Button>
                <Button variant="success" type="reset" className="mx-2 float-end">
                  {uzLang?"Tozalash":enLang?"Clear":"Очистить"}
                </Button>
              </Form>
            </div>
                      <div className="col-lg-6 col-md-6 imgGifSec">
                          <div className="card border-0" data-aos="zoom-in-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
                              <div className="imgs" >
                                  <img width="100%" alt=" " src={rasm} />
                              </div>
                          </div>
                      </div>
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

export default connect(mapStateToProps, {uzLanguege,  ruLanguege, enLanguege })(Section);
