import React, { useEffect, useState } from 'react'
import { saveDiploms } from '../config/tuitor'
import { host1 } from '../config/host'
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { connect } from 'react-redux';
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: aqua;
`;
const Diplomlar = (props) => {
    const [diplom, setDiplom] = useState([])
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#318C22");
    const size = "large"
    const getDiplom=(uz,en)=>{
        saveDiploms(uz,en).then((res)=>{
            setDiplom(res.data)
            setLoading(false)
            
        }).catch((res)=>{
            console.log("Error");
        })
    }

    useEffect(()=>{
        getDiplom(props.uzLang, props.enLang)
    },[props.uzLang, props.enLang])
  return (
    <React.Fragment>
        <div className='container'>
            <h3 className='my-4 text-center'>{props.uzLang?"Diplomlar ro'yxati":props.enLang?"List of diplomas":"Список дипломов"}</h3>
            <div className='row my-5'>

                {loading?<div><div className="sweet-loading">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" /> */}

      <CircleLoader color={color} loading={loading} css={override} size={100} />
    </div></div>:diplom.map((item,index)=>(
                        <div className='col-lg-6 col-md-6 my-3' data-aos="zoom-in-up" key={index}>
                        <div className='card p-3'>
                            <h5 className='text-center'>{item.name}</h5>
                            <p>{item.description}</p>
                            <div className='card-footer d-flex justify-content-end'>
                                <a href={`${host1}${item.diplom}`}><Button type="primary" shape="round" icon={<DownloadOutlined  />} size={size}>
                                    Download
                                    </Button></a>
                                
                            </div>
                        </div>
                        </div>
                ))}
               
            </div>
        </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
    return {
      uzLang: state.changeLang.uzLang,
      enLang: state.changeLang.enLang,
    };
  };
  export default connect(mapStateToProps, { uzLanguege, ruLanguege, enLanguege })(
    Diplomlar
  );