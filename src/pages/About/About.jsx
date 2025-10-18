import React from 'react';
import './About.css';
import { PiCoffee } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import book from '../../../public/images/Book-Logo.png'



function About(){
return(
  <div className="About max-md:flex-col flex">

    <div className='max-md:w-full flex flex-col gap-5 w-1/2 p-10'>
      <h1 className='text-4xl text-center font-semibold text-blue-800'>About Our Bookstore</h1>
      <p className='indent-10'>
        Welcome to <span className='text-blue-600'>BookNest</span>, your cozy corner for discovering stories that inspire, teach, and entertain. Our mission is to make books accessible to everyone and to encourage a lifelong love of reading.</p>
        <p className='indent-10'>
          We belive books are more than pages-they're journeys, dreams, and ideas waiting to be explored.
        </p>
         <p className='indent-10'>
          Founded in 2025, we started as a small local Bookstore with a big dream: to connect readears with books that change their lives. Today, we offer a wide collection ranging from fiction and self-development to science , art, and technology.
        </p>
       <p className='indent-10'> 
        Our collection includes everthing from timeless classics to the latest bestsellers, with categories that fit every reader's taste-fiction, self-development, science, art, and more.
        </p>
        <p className='indent-10'>
          Whether you're a passionate reader or just beginning your reading journey, we're here to help you find your next favorite book.
        </p>
       <p className='indent-10'> 
        Sit back, grab a cup of coffee, and let your next adventure begin with <span className='flex gap-2 text-blue-600'>BookNest <PiCoffee/> <GiBookmarklet/></span>
      </p>
    </div>

    <div className='max-md:w-full gap-5 w-1/2 p-10 '>
       <img src={book} className='w-full h-full' alt="" />
    </div>
  </div>
);
}


export default About;
