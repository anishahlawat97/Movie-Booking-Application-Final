import React from "react";
import { Component } from "react";
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import './Header.css';
import AppContext from "../../AppContext";
import { Button } from "@mui/material";


class Header extends Component{  
   
    constructor(props){
        super(props); 
        this.loginHandler= this.loginHandler.bind(this);
    }  
    loginHandler(){
        (this.context.setLoginValue(!this.context.isLogin))
    }   

    static contextType = AppContext;    
    render(){
        return(                 
        <div className="header">  
            {this.context.bookShow?<Button sx={{color: 'primary', width: '9%', position: 'absolute', right: '15%'}} variant="contained">Book Show</Button>:null } 
            {this.context.isLogin?<Button sx={{color: 'primary', width: '9%', position: 'absolute', right: '5%'}} variant="contained" onClick={this.loginHandler}>Logout</Button>:<Button sx={{color: 'primary', width: '9%', position: 'absolute', right: '5%'}} onClick={this.loginHandler} variant="contained">Login</Button>}    
           <ReactLogo className="logo"/>
        </div>  
        );     
    }
}


export default Header;