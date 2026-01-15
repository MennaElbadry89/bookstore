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
//   <div className="Header h-120 relative z-0 w-full overflow-hidden">
//     <div className="z-5 bg-[url( absolute inset-0'/images/library.jpg')] bg-cover bg-center bg-no-repeat">
//     <div className="overlay absolute inset-0 z-10 bg-black/60"></div>
//     <div className='py-50 relative z-20 mx-5 flex flex-col items-center justify-center gap-5'>
//       <h1 className='text-stroke text-2xl font-bold text-blue-500 sm:text-4xl md:text-6xl'>Welcome to Bookstore</h1>
//       <h3 className='text-stroke text-xl font-bold text-blue-500 sm:text-2xl md:text-4xl'>Discover the latest books in Technology, AI, and more... </h3>
//       {/* <form onSubmit={handleSubmit} className='w-1/2 border border-blue-500'>
//         <input type="text" className='w-3/4 px-5 py-2' placeholder='search for books' value={searchTirm} 
//         onChange={(e)=>setSearchTirm(e.target.value)}/>
//         <button type='submit' className='w-1/4 cursor-pointer bg-blue-500 px-2 py-2 text-white hover:bg-blue-700'>Search</button>
//       </form> */}
//     </div>
//     </div>
// </div>

<div className="Header relative z-0 h-[500px] w-full overflow-hidden">
  
  <div  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/library.jpg')" }}></div>

  <div className="absolute inset-0 z-10 bg-black/60"></div>

  <div className="relative z-20 mx-5 flex h-full flex-col items-center justify-center gap-5">
    <h1 className="text-stroke text-2xl font-bold text-blue-500 sm:text-4xl md:text-6xl">
      Welcome to Bookstore
    </h1>
    <h3 className="text-stroke text-xl font-bold text-blue-500 sm:text-2xl md:text-4xl">
      Discover the latest books in Technology, AI, and more...
    </h3>
  </div>

</div>

)
}


export default Header;
