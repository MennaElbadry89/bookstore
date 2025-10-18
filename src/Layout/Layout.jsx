import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar/Navbar';
import Footer from '../common/Footer/Footer';
import ContactLinks from '../pages/Contact/ContactLinks';

export default function Layout(){

return( 

  <div className="Layout relative ">

    <Navbar/>
    <Outlet/>
    <ContactLinks/>
    <Footer/>
    

  </div>
)
}


