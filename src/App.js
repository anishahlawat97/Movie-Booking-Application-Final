import React, {useState} from 'react';
import Home from './screens/home/Home.js';
import Details from './screens/details/Details.js';
import Header from './common/header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppContext from './AppContext.js';

export default function App() {
    const [bookShowValue, setBookShowValue] = useState(false);
    const [loginValue, setLoginValue] = useState(false);
    const globalSettings = {
        bookShow: bookShowValue,
        isLogin: loginValue,
        setBookShowValue,
        setLoginValue,
    };
     
    return(
        <AppContext.Provider value={globalSettings}>
            <Header/>
            <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/details/:id' element={<Details/>}/>
            </Routes>
            </Router>  
        </AppContext.Provider> 
    )
}