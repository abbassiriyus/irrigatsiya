import React, { Component } from 'react'
import style5 from '../css/Elon.module.css'
import {uzLanguege} from '../redux/Actions/uzLanguege';
import {ruLanguege} from '../redux/Actions/ruLanguege';
import {enLanguege} from '../redux/Actions/enLanguege';
import { connect } from 'react-redux';
import { elons } from '../config/tuitor';


class Elon extends Component {
    state={
        elonFoto:[],
        bat:true
    }

    batafsil=()=>{
      this.state.bat?(this.setState({bat:false})):(this.setState({bat:true})) 
    }


    getElons(uz,en){
        elons(uz,en).then((res)=>{
            
            this.setState({
                elonFoto: res.data,
            })
        }).catch((res)=>{
            
        })
    }

    componentDidMount(){
        this.getElons(this.props.uzLang, this.props.enLang)
    }


    render() {
        const {elonFoto} = this.state
        const {uzLang, enLang} = this.props
        return (        

            <>
                  <div className="card p-2 elonScrol my-5" id={style5.elonScrol}>  
                    
                      
                    
                        <h3 className="text-center elons" id={style5.elons}>{uzLang?"E'lonlar":enLang?"Announcements":"Объявления"}</h3>
                   {elonFoto.map((item,index)=>(

                       <div key={index}>
                           <hr/>
                            <img src={item.image}  className="card-img-top" alt="..."/>
                           <div id="bat" className="card-body">
                                    <h4>{item.name}</h4>
                                 {this.state.bat?( <p style={{height:'65px',overflow:'hidden'}} >
                                        {item.text}
                                    </p>): ( <p style={{height:'auto',overflow:'hidden'}} >
                                        {item.text}
                                    </p>)}
                                    <a href='#home' style={{cursor:'pointer'}} onClick={this.batafsil}>Batafsil</a>
                                </div>
                       </div>
                   ))}

                </div>
                  
            </>
        )
                   }
}
const mapStateToProps = (state) => {
    return {
      uzLang: state.changeLang.uzLang,
      enLang: state.changeLang.enLang,
    }
  }

export default connect(mapStateToProps, {uzLanguege,  ruLanguege, enLanguege })(Elon)