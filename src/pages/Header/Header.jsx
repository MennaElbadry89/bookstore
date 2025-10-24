// import React, { useContext, useState } from 'react';
import './Header.css';

// import { BookContext } from '../../context/BookContext';

function Header(){
  // const {setQuery , getBook} = useContext(BookContext);
  // const[searchTirm , setSearchTirm] = useState('');

  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //   if(searchTirm.trim() !== "") {
  //   // setQuery(searchTirm);
  //   getBook(searchTirm);      
  //   }
  // }

  
return(
  <div className=''>
  <div className="Header relative w-full z-0 overflow-hidden h-120">
    <div className="absolute inset-0 z-5 bg-[url('/images/library.jpg')] bg-cover bg-no-repeat bg-center  ">
    <div className="overlay absolute inset-0 bg-black/60 z-10"></div>
    <div className='relative z-20 flex flex-col items-center justify-center gap-5 mx-5 py-50'>
      <h1 className='max-sm:text-2xl  max-md:text-4xl text-6xl font-bold text-blue-500 text-stroke'>Welcome to <span className='max-sm:text-2xl max-md:text-4xl text-6xl font-bold text-blue-500 text-stroke'>Bookstore</span> </h1>
      <h3 className='max-sm:text-xl  max-md:text-2xl text-4xl font-bold text-blue-500 text-stroke'>Discover the latest books in AI, Technology, and more... </h3>
      {/* <form onSubmit={handleSubmit} className='border border-blue-500 w-1/2'>
        <input type="text" className='py-2 px-5 w-3/4' placeholder='search for books' value={searchTirm} 
        onChange={(e)=>setSearchTirm(e.target.value)}/>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-1/4 cursor-pointer'>Search</button>
      </form> */}
    </div>
    </div>
</div>
</div>
)
}


export default Header;
