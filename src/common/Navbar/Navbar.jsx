import React, { useContext, useState } from 'react';
import './Navbar.css';
import book from '/images/Book-Logo.png'
import { FaCartShopping } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

import { BookContext } from '../../context/BookContext';
import { useCart } from '../../context/CartContext';
import { CountryContext} from '../../context/CountryContext'
import { AuthContext } from '../../context/AuthContext';

function Navbar(){
  const navigate = useNavigate();
    const {setQuery , getBook} = useContext(BookContext);
    const[searchTirm , setSearchTirm] = useState('');
  
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(searchTirm.trim() !== "") {
      // setQuery(searchTirm);
      getBook(searchTirm);  
      navigate('books');
      }
    }

const {country ,selected , setSelected } = useContext(CountryContext);
const {loading , currentUser , loadingDisplayCurrentUser , logout} = useContext(AuthContext)
const [openn, setOpenn] = useState(false)
const[exist , setExist] = useState(false)

  const {cartItems } = useCart()
  // const {getBook} = useContext(BookContext);

  // const navigate = useNavigate();
  const [open , setOpen] = useState(false);
  const [isOpen , setIsOpen] = useState(false);
  const categories = [
    {name: "Technology" , query: 'technology'},
    {name: "Scince" , query: 'scince'},
    {name: "Art" , query: 'art'},
    {name: "Fiction" , query: 'fiction'},
    {name: "History" , query: 'history'},
  ]

  const handleCategory = (query)=>{
    getBook(query)
    setIsOpen(false)
    navigate('/books')
  }

            // total number of books in cart (sum of quantities)
    const totalItems = cartItems.reduce((a, b) =>{ 
      const sum = a + (+(b.quantity) || 1 )
      return sum
    },0 );

    let countryData = null;
if (selected) {
  // Footer Options sets selected to the whole country object (with name, flag).
  if (typeof selected === 'object') {
    countryData = selected;
  } else if (Array.isArray(country)) {
    // Support several country data shapes: { name: 'X' } or { name: { common: 'X' }, cca2, cca3, flags }
    countryData = country.find(c =>
      (typeof c?.name === 'string' && c.name === selected) ||
      c?.name?.common === selected ||
      c?.cca2 === selected ||
      c?.cca3 === selected
    );
  }
}

return(
  <div className="Navbar z-50">
    <div className="nav relative flex items-center justify-between bg-blue-50 px-10 py-2 shadow-xl shadow-blue-100 max-md:relative">
       <div className='flex items-center justify-center gap-5 max-md:gap-2'>
      <a  className="logo h-12 w-12 rounded-full max-md:h-8 max-md:w-8" href='/'>
        <img src={book} alt="" />
      </a >
        <form onSubmit={handleSubmit} className='border border-blue-500'>
        <input type="text" className='w-3/4 p-2' placeholder='search for books' value={searchTirm} 
        onChange={(e)=>setSearchTirm(e.target.value)}/>
        <button type='submit' className='w-1/4 cursor-pointer bg-blue-500 p-2 text-white hover:bg-blue-700'>Go</button>
      </form>
      </div>
{/* <div className={` ${open ? 'flex' : 'hidden'}max-md:top-15 gap-25 flex items-center justify-center bg-blue-50 max-md:absolute max-md:left-0 max-md:w-full max-md:flex-col max-md:items-start max-md:gap-5 max-md:p-5 max-md:pl-5`} > */}
     <div className={`// ${open ? 'flex' : 'hidden'} max-md:top-15 z-50 bg-blue-50 max-md:absolute max-md:left-0 max-md:w-full max-md:flex-col max-md:items-start max-md:gap-5 max-md:p-5 md:static md:flex md:flex-row md:items-center md:justify-center md:gap-10`}>
 <div className=''>
        <ul className='flex items-center justify-center gap-5 max-md:flex-col md:gap-2'>
          <li className='text-blue-700 hover:font-semibold'><a href="/home">Home</a></li>
          <li className='text-blue-700 hover:font-semibold'><a href="/about">About</a></li>
          <li className='relative text-blue-700 transition hover:font-semibold' 
              onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}> Categories
            { isOpen && (<ul className='shadoe-xl w-50 absolute top-full bg-blue-50'>
              {
              categories.map((cat , index)=>(<li key={index} onClick={()=>handleCategory(cat.query)}
              className='cursor-pointer px-4 py-2 hover:border hover:border-blue-100 hover:shadow-xl'> {cat.name} </li>
              ))}
                 </ul>)} 
          </li>
          <li className='text-blue-700 hover:font-semibold'><a onClick={()=>setOpen(false)} href="/contact">Contact</a></li>
          <li className='text-blue-700 hover:font-semibold'><a onClick={()=>setOpen(false)} href="/books">Books</a></li>
        </ul>
      </div>

    <div className="profile flex gap-5 text-blue-700 max-md:my-2 max-md:flex max-md:items-center max-md:justify-center">
    { loadingDisplayCurrentUser && loading ? (         
          <div className="flex items-center">        
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-blue-500' />            
          </div>
        ) : !loadingDisplayCurrentUser && !currentUser ? (
          <div className="authHandler flex items-center gap-3">
            <a href={"/register"} onClick={()=>setOpen(false)} className="text-blue-500 hover:text-blue-300">Register</a>
            <a href={"/login"} onClick={()=>setOpen(false)} className="text-blue-500 hover:text-blue-300">Login</a>
          </div>
        ) : (
          <div className="relative">
            <button onClick={() => setExist(!exist)} className="mr-5 flex items-center gap-2">
              {countryData ? (
                <img src={countryData?.flags?.png || countryData?.flags?.svg || countryData?.flag} alt={countryData?.name?.common || selected} className="h-8 w-8 rounded-full"/>
              ) : (
                <span className="text-blue-500">welcome</span>
              )}
              <span className="text-blue-500">{currentUser?.fullname || currentUser?.name || ''}</span>
            </button>

            {exist && (
              <ul className="absolute -right-20 mt-2 w-[180px] rounded bg-white p-2 shadow-md">
                <li><a href={"/profile"} onClick={()=>setOpen(false)} className="block rounded px-2 py-1 hover:bg-blue-50">Profile</a></li>
                <li><a href={"/orders"} onClick={()=>setOpen(false)} className="block rounded px-2 py-1 hover:bg-blue-50">Orders</a></li>
                <li>
                  <button className="w-full rounded px-2 py-1 text-left hover:bg-red-100" onClick={()=>setOpenn(true)}>Logout</button>
                </li>
              </ul>
            )}

            { openn && (
              <div className="z-100 fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/30">
                <div className='flex w-80 flex-col gap-4 rounded-xl bg-white p-6'>
                  <h2 className='text-center font-semibold text-blue-950'>Are you sure to exit ?</h2>
                  <div className='flex justify-center gap-2'>
                    <button className="w-1/2 rounded-xl bg-red-700 px-3 py-2 text-white hover:bg-red-500" onClick={logout}>Logout</button>
                    <button className="w-1/2 rounded-xl bg-green-700 px-3 py-2 text-white hover:bg-green-500" onClick={()=>setOpenn(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
</div>
     
      <div className="cart flex gap-1 text-2xl text-blue-500 max-md:items-center max-md:justify-center">
          <a href="/cart"><FaCartShopping/></a> 
          <sup className='text-red-500'>{(currentUser) ? totalItems : ""}</sup>
      </div>
  </div>
{/* </div> */}
        <div className='menubar hidden text-2xl text-blue-500 max-md:flex' >
          <button onClick={()=>setOpen(!open)}><TfiMenuAlt /></button>
        </div>

    </div>
  </div>
)
}


export default Navbar;
