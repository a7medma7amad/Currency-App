import './App.css';
import * as React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import { useState , useEffect} from "react";
import CurrencyConvertor from './CurrencyConvertor';
import Navbar from './navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = ()=>{
   useEffect(() => {
       document.title = "Currency Convertor App"
    }, []);
   return(
       <div className='App'>
       <BrowserRouter>
       <Routes>   
         <Route exact path="/" element={ <CurrencyConvertor/> } />
         <Route exact path="/login" element={ <SignIn/> } />
         <Route exact path="/signup" element={ <SignUp/> } />
       </Routes>
       
       </BrowserRouter>
       </div>
       

   )
}

export default App