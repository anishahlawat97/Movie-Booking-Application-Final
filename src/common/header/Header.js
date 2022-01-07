import React, { useContext} from "react";
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import './Header.css';
import AppContext from "../../AppContext";
import { Button } from "@mui/material";


function Header(){
    const context = useContext(AppContext);  

    function loginHandler(){
        (context.setLoginValue(!context.isLogin))
    }   
    
    return(                 
    <div className="header">  
        {context.bookShow?<Button sx={{color: 'primary', width: '9%', position: 'absolute', right: '15%'}} variant="contained">Book Show</Button>:null } 
        {context.isLogin?<Button sx={{ width: '9%', position: 'absolute', right: '5%'}} variant="contained" onClick={loginHandler}>Logout</Button>:<Button sx={{width: '9%', position: 'absolute', right: '5%'}} onClick={loginHandler} variant="contained">Login</Button>}    
        <ReactLogo className="logo"/>
    </div>  
    );  
}

export default Header;