// import React, { Component } from "react";
// import { host1 } from "../config/host";
// import style4 from "../css/Asisent.module.css";
// import { saveTuitor } from "../config/tuitor";
// import { connect } from "react-redux";
// import { uzLanguege } from "../redux/Actions/uzLanguege";
// import { ruLanguege } from "../redux/Actions/ruLanguege";
// import { enLanguege } from "../redux/Actions/enLanguege";
// class ProfilPages extends Component {
//   state = {
//     userdata: [],
//   };
//   getMalumot() {
//     saveTuitor()
//       .then((res) => {
//         this.setState({
//           userdata: res.data,
//         });
//       })
//       .catch((res) => {});
//   }
//   componentDidMount() {
//     this.getMalumot();
//   }
//   render() {
//     const { userdata } = this.state;
//     const { uzLang, enLang } = this.props;
//     return (
//       <>
//         <div className="card mycard mb-4" id={style4.mycard}>
//           <div className="card-header" id={style4.cardheader}>
//             <img
//               src={`${host1}` + userdata.avatar}
//               className="card-img-top w-100"
//               alt="Profile images"
//             />
//           </div>
//           <div className="card-body p-0">
//             <button className="btn mybtn w-100" id={style4.mybtn}>
//               <i className="fa fa-address-card mx-2"></i>
//               {uzLang ? "Profil" : enLang ? "Profile" : "Профил"}
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     uzLang: state.changeLang.uzLang,
//     enLang: state.changeLang.enLang,
//   };
// };
// export default connect(mapStateToProps, { uzLanguege, ruLanguege, enLanguege })(
//   ProfilPages
// );
