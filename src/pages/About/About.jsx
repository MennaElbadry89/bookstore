import React from 'react';
import './About.css';
import { PiCoffee } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
// import book from '../../../public/images/Book-Logo.png'
import { motion } from "framer-motion";



function About(){
return(
  <div className="About mx-20 flex max-md:mx-10 max-md:flex-col">

    <div className='flex w-1/2 flex-col gap-5 max-md:w-full max-md:gap-2'>
      <h1 className='pt-10 text-center text-4xl font-semibold text-blue-600 max-md:text-2xl'>About Our Bookstore</h1>
      <p className='w-full indent-6'>
        Welcome to <b className='text-blue-600'>Bookstore</b>, your cozy corner for discovering stories that inspire, teach, and entertain. Our mission is to make books accessible to everyone and to encourage a lifelong love of reading.</p>
        <p className='w-full indent-6'>
          We belive books are more than pages-they're journeys, dreams, and ideas waiting to be explored.
        </p>
         <p className='w-full indent-6'>
          Founded in 2025, we started as a small local Bookstore with a big dream: to connect readears with books that change their lives. Today, we offer a wide collection ranging from fiction and self-development to science , art, and technology.
        </p>
       <p className='w-full indent-6'> 
        Our collection includes everthing from timeless classics to the latest bestsellers, with categories that fit every reader's taste-fiction, self-development, science, art, and more.
        </p>
        <p className='w-full indent-6'>
          Whether you're a passionate reader or just beginning your reading journey, we're here to help you find your next favorite book.
        </p>
       <p className='w-full indent-6'> 
        Sit back, grab a cup of coffee, and let your next adventure begin with <b className='flex items-center justify-start gap-2 text-blue-600'>Bookstore <PiCoffee/> <GiBookmarklet/></b>
      </p>
    </div>

    <div className='mx-auto flex w-full items-center justify-center gap-5 p-10 md:w-1/2'>
       {/* <img src={book} className='h-full w-full' alt="" /> */}
            
      <div className="ml-30 my-5 flex items-center justify-center text-blue-800 md:ml-40">
      

      {/* Book */}
      <span className="perspective-[1600px] h-46 relative w-32 md:h-72 md:w-48">
        {/* Book body */}
        <span className="absolute inset-0 rounded-md bg-slate-200 shadow-xl" />

        {/* Spine */}
        <span className="absolute left-0 top-0 h-full w-1 bg-slate-600" />

        {/* Pages */}
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 origin-left rounded bg-gradient-to-r from-slate-100 to-slate-300 shadow"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{
              duration: 1.4,
              delay: i * 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            style={{ zIndex: 5 - i }}
          />
        ))}

        {/* Front Cover */}
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-blue-600 to-blue-900 shadow-lg" />

        {/* Shadow */}
        <span className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-black/30 blur-md" />
      </span>
    </div>
    
    </div>
  </div>
);
}


export default About;
