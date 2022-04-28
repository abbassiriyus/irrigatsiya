import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import { fotosLavha } from "../config/tuitor";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { connect } from "react-redux";
import chilonzorimg from "./../img/fotolarchilonzor.jpg";
import "./../css/Multipleltems.module.css";
const CaruselPage = (props) => {
  // const [datas, setDatas] = useState([]);
  // const [counter, setCounter] = useState(0);
  const [loader, setLoader] = useState(true);
  const [album, setAlbum] = useState([]);
  // const getMalumot = () => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  //     setDatas(res.data);
  //     setLoader(false);
  //   });
  // };
  const getPhotos = (uz, en) => {
    fotosLavha(uz, en)
      .then((responsive) => {
        setAlbum(responsive.data);
        setLoader(false);
       
      })
      .catch((responsive) => {
        console.log("Error");
      });
  };
  // const kamaytirish = () => {
  //   if (counter != 0) {
  //     setCounter(counter - 1);
  //   } else {
  //     setCounter(counter);
  //   }
  // };
  // const oshirish = () => {
  //   setCounter(counter + 1);
  // };
  useEffect(() => {
    // getMalumot();

    getPhotos(props.uzLang, props.enLang);
  }, [props.uzLang, props.enLang]);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const { uzLang, enLang } = this.props;
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 " id="chilonzor">
           
            <Slider {...settings}>
              {album.map((item, index) => (
                <div key={index} className="card m-0">
                  <div className="card-body">
                    <div className="card-img">
                      <img
                        width="100%"
                        height="500px"
                        src={item.image}
                        alt="Rasim yo'q"
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="text-title">{item.name}</h5>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    uzLang: state.changeLang.uzLang,
    enLang: state.changeLang.enLang,
  };
};
export default connect(mapStateToProps, { uzLanguege, ruLanguege, enLanguege })(
  CaruselPage
);

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        boxShadow: "0px 0px 7px rgba(0,0,0,0.5)",
        color: "white",
        position: "absolute",
        zIndex: "1",
        right: "-12px",
        bottom: "calc(50% - 12px)",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <GrNext />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        boxShadow: "0px 0px 7px rgba(0,0,0,0.5)",
        color: "white",
        position: "absolute",
        zIndex: "1",
        top: "calc(50% - 12px)",
        left: "-12px",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <GrPrevious />
    </div>
  );
}
