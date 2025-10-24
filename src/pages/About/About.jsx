import React from 'react';
import './About.css';
import { PiCoffee } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import book from '../../../public/images/Book-Logo.png'



function About(){
return(
  <div className="About max-md:flex-col max-md:mx-10 flex mx-20">

    <div className='max-md:w-full max-md:gap-2 flex flex-col gap-5 w-1/2 '>
      <h1 className=' max-md:text-2xl text-4xl pt-10 text-center font-semibold text-blue-600'>About Our Bookstore</h1>
      <p className='indent-6 w-full'>
        Welcome to <b className='text-blue-600'>BookNest</b>, your cozy corner for discovering stories that inspire, teach, and entertain. Our mission is to make books accessible to everyone and to encourage a lifelong love of reading.</p>
        <p className='indent-6 w-full'>
          We belive books are more than pages-they're journeys, dreams, and ideas waiting to be explored.
        </p>
         <p className='indent-6 w-full'>
          Founded in 2025, we started as a small local Bookstore with a big dream: to connect readears with books that change their lives. Today, we offer a wide collection ranging from fiction and self-development to science , art, and technology.
        </p>
       <p className='indent-6 w-full'> 
        Our collection includes everthing from timeless classics to the latest bestsellers, with categories that fit every reader's taste-fiction, self-development, science, art, and more.
        </p>
        <p className='indent-6 w-full'>
          Whether you're a passionate reader or just beginning your reading journey, we're here to help you find your next favorite book.
        </p>
       <p className='indent-6 w-full'> 
        Sit back, grab a cup of coffee, and let your next adventure begin with <b className='flex gap-2 text-blue-600'>BookNest <PiCoffee/> <GiBookmarklet/></b>
      </p>
    </div>

    <div className='max-md:w-full gap-5 w-1/2 p-10 '>
       <img src={book} className='w-full h-full' alt="" />
    </div>
  </div>
);
}


export default About;
