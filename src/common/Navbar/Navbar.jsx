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
  <div className="Navbar z-100">
    <div className="nav max-md:relative  flex items-center justify-between  bg-blue-50 px-10 py-2 shadow-xl shadow-blue-100">
       <div className='max-md:gap-2 flex items-center justify-center gap-5'>
      <a  className="logo max-md:w-8 max-md:h-8 w-12 h-12 rounded-full" href='/'>
        <img src={book} alt="" />
      </a >
        <form onSubmit={handleSubmit} className='border border-blue-500 '>
        <input type="text" className='p-2 w-3/4' placeholder='search for books' value={searchTirm} 
        onChange={(e)=>setSearchTirm(e.target.value)}/>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2  w-1/4 cursor-pointer'>Go</button>
      </form>
      </div>
{/* <div className={` ${open ? 'flex' : 'hidden'} max-md:flex-col max-md:gap-5 max-md:items-start max-md:pl-5 max-md:p-5 max-md:w-full max-md:absolute max-md:top-15 max-md:left-0   bg-blue-50   flex items-center justify-center gap-25 `} > */}
     <div className={`
    ${open ? 'flex' : 'hidden'}  max-md:flex-col max-md:gap-5 max-md:items-start max-md:pl-5  max-md:w-full max-md:absolute max-md:top-15 max-md:left-0 bg-blue-50 z-100 
    md:flex md:static md:flex-row md:items-center md:justify-center md:gap-10`}>
      <div className=''>
        <ul className='max-md:flex-col md:gap-2 flex items-center justify-center gap-5 '>
          <li className='text-blue-700 hover:font-semibold'><a href="/home">Home</a></li>
          <li className='text-blue-700 hover:font-semibold'><a href="/about">About</a></li>
          <li className='text-blue-700 hover:font-semibold relative transition' 
              onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}> Categories
            { isOpen && (<ul className='absolute top-full bg-blue-50 shadoe-xl w-50'>
              {
              categories.map((cat , index)=>(<li key={index} onClick={()=>handleCategory(cat.query)}
              className='py-2 px-4 hover:border hover:border-blue-100 hover:shadow-xl cursor-pointer'> {cat.name} </li>
              ))}
                 </ul>)} 
          </li>
          <li className='text-blue-700 hover:font-semibold'><a href="/contact">Contact</a></li>
          <li className='text-blue-700 hover:font-semibold'><a href="/books">Books</a></li>
        </ul>
      </div>


    <div className="profile flex gap-5 text-blue-700">
    { loadingDisplayCurrentUser && loading ? (         
        <div className="flex items-center">
          
            <div className='animate-spin w-5 h-5 border-2 rounded-full border-blue-500' />
            
          </div>
        ) : !loadingDisplayCurrentUser && !currentUser ? (
          <div className="authHandler flex gap-3 items-center">
            <a href={"/register"} className="text-blue-500 hover:text-blue-300">Register</a>
            <a href={"/login"} className="text-blue-500 hover:text-blue-300">Login</a>
          </div>
        ) : (
          <div className="relative">
            <button onClick={() => setExist(!exist)} className="mr-5 flex items-center gap-2">
              {countryData ? (
                <img src={countryData?.flags?.png || countryData?.flags?.svg || countryData?.flag} alt={countryData?.name?.common || selected} className="w-8 h-8 rounded-full"/>
              ) : (
                <span className="text-blue-500">welcome</span>
              )}
              <span className="text-blue-500">{currentUser?.fullname || currentUser?.name || ''}</span>
            </button>

            {exist && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded p-2 w-[180px]">
                <li><a href={"/profile"} className="block py-1 px-2 hover:bg-blue-50 rounded">Profile</a></li>
                <li><a href={"/orders"} className="block py-1 px-2 hover:bg-blue-50 rounded">Orders</a></li>
                <li>
                  <button className="w-full text-left py-1 px-2 hover:bg-red-100 rounded" onClick={()=>setOpenn(true)}>Logout</button>
                </li>
              </ul>
            )}

            { openn && (
              <div className="fixed inset-0 z-100 overflow-y-auto bg-black/30 flex items-center justify-center">
                <div className='bg-white p-6 rounded-xl flex flex-col gap-4 w-80'>
                  <h2 className='text-blue-950 text-center font-semibold'>Are you sure to exit ?</h2>
                  <div className='flex gap-2 justify-center'>
                    <button className="bg-red-700 hover:bg-red-500 px-3 py-2 rounded-xl text-white w-1/2" onClick={logout}>Logout</button>
                    <button className="bg-green-700 hover:bg-green-500 px-3 py-2 rounded-xl text-white w-1/2" onClick={()=>setOpenn(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
</div>


     
      <div className="cart text-2xl text-blue-500 flex gap-1  ">
          <a href="/cart"><FaCartShopping/></a> 
          <sup className='text-red-500'>{(currentUser) ? totalItems : ""}</sup>
      </div>
  </div>
{/* </div> */}
        <div className='menubar max-md:flex hidden text-2xl text-blue-500 ' >
          <button onClick={()=>setOpen(!open)}><TfiMenuAlt /></button>
        </div>

    </div>
  </div>
)
}


export default Navbar;
