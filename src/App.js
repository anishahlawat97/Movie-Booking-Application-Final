import React, { useState } from 'react';
import Home from './screens/home/Home.js';
import Details from './screens/details/Details.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './AppContext.js';
import BookShow from './screens/bookshow/BookShow.js';
import Confirmation from './screens/confirmation/Confirmation.js';

export default function App() {
    const [bookShowValue, setBookShowValue] = useState(false);
    const [loginValue, setLoginValue] = useState(false);
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [loginMessage, setLoginMessage] = useState(''); 
    const globalSettings = {
        bookShow: bookShowValue,
        isLogin: loginValue,
        openModal: open,
        loginMessage: loginMessage,
        tabValue: tabValue,
        setTabValue,
        setLoginMessage,
        setOpen,
        setBookShowValue,
        setLoginValue,
    };

    return(
        <AppContext.Provider value={globalSettings}>              
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/details/:id' element={<Details/>}/>
                    <Route path='/bookShow/:id' element={<BookShow/>}/>
                    <Route path='/confirmation/:id' element={<Confirmation/>}/>
                </Routes>
            </Router>  
        </AppContext.Provider> 
    )
}