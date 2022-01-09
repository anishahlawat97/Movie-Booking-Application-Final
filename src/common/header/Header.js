import React, { useContext} from "react";
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';
import './Header.css';
import AppContext from "../../AppContext";
import { Button } from "@mui/material";
import BasicModal from "../modal/Modal";
import { useParams, Link } from 'react-router-dom';

function Header(){
    const context = useContext(AppContext);  
    const { id } = useParams();
    // context.setBookShowValue(true);
    

    function logoutHandler(){
        context.setLoginValue(false);
        context.setLoginMessage('');

    }
    
    const handleOpen = () => {
        context.setOpen(true);
        context.setTabValue(0);
    }

    const bookShowHandler = () => {
        if(!context.isLogin){
            handleOpen();
            context.setTabValue(1);
        }
        
    }
    
    return(                 
    <div className="header">  
        {context.bookShow ? <Button sx={{color: 'primary', width: '9%', position: 'absolute', right: '15%'}} onClick={bookShowHandler} variant="contained">Book Show</Button> : null }
        {(context.isLogin && context.bookShow ) ? <Link to={`/bookShow/${id}`}><Button variant="contained" sx={{color: 'primary', width: '9%', position: 'absolute', right: '15%'}}>Book Show</Button></Link> : null}
        {context.isLogin ? <Button sx={{ width: '9%', position: 'absolute', right: '5%'}} variant="contained" onClick={logoutHandler}>Logout</Button> : <Button sx={{width: '9%', position: 'absolute', right: '5%'}} variant='contained' onClick={handleOpen}>Login</Button>}  
        <ReactLogo className="logo"/>
        <BasicModal/>
    </div>  
    );  
}

export default Header;