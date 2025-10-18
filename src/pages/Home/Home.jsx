import React, { useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Books from '../Book/Books';
import NewBooks from '../Book/NewBooks';
import BestSale from '../Book/BestSale';

export default function Home(){


return(
  <div className="Home ">
    <Header/>
    <Categories/>
    <NewBooks/>
    <BestSale/>
    {/* <Books/> */}
    {/* <About/> */}
    {/* <Contact/> */}
    
</div>
)
}


