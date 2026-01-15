import { useContext, useEffect , useState } from 'react';
import './Books.css';
import { BookContext } from '../../context/BookContext';
import { GiOpenBook } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from '../../context/CartContext';
import  LottiHandeler from '../../assets/lottifiles/LottiHandeler';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import {AuthContext} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {useWishlist} from '../../context/WishlistContext';



export default function Books(){

   const { handleAddToCart } = useCart();
   const { handleAddToWishlist } = useWishlist()
   const { currentUser } = useContext(AuthContext);
   const navigate = useNavigate()
   

    const handleAdd = (book) => {
     if (!currentUser) {
       Swal.fire({
         icon: 'warning',
         title: 'Please log in',
         text: 'You need to log in before adding items to your cart.',
         showCancelButton: true,
         confirmButtonText: 'Login',
         cancelButtonText: 'Cancel',
       }).then((result) => {
         if (result.isConfirmed) {
           navigate('/login'); 
         }
       });
       return; 
     }
     console.log('Books.handleAddToCart -> item:', book);
   
     try {
       handleAddToCart(book);
       console.log('addToCart called');
       Swal.fire({
         icon: 'success',
         title: 'Added to cart',
         text: `"${book.volumeInfo.title}" has been added to your cart.`,
         timer: 1500,
         showConfirmButton: false,
       });
     } catch (err) {
       console.error('addToCart failed:', err);
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Failed to add book to cart.',
       });
     }
   };
   

    const {books , loading , getBook } = useContext(BookContext);
    const [selectedBook , setSelectedBook] = useState(null)
    const [query , setQuery ] = useState('programming')

    useEffect(()=>{
         getBook(query)
    }, [query])

    console.log('books state:' , books)

    const handleopen = (book)=>{
        setSelectedBook(book)
    }
  
    const handleClose = ()=>{
        setSelectedBook(null)
    }


  const [pageNumber, setPageNumber] = useState(0);
  const booksPerPage = 6;
  const pagesVisited = pageNumber * booksPerPage;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    if(loading) return <LottiHandeler status={'page'}/>  
    
    return(
      <div className='mx-0 flex flex-col p-2 md:mx-20 md:p-5'>
        {/* <h1 className='mx-auto my-6 flex gap-2 text-4xl font-bold text-blue-600'>Books < GiOpenBook /> </h1> */}
       
        <h1 className="md:gap-15 mx-auto my-5 flex items-center gap-7 text-2xl font-bold text-blue-800 md:text-6xl">
         Books

      {/* Book */}
      <span className="perspective-[1600px] md:h-15 relative h-10 w-7 md:w-10">
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
        </h1>
              
       {
         books.length === 0 ? (< p className='text-center'> No result found</p> ) :
       ( <div className="lg:grid-col-4 grid grid-cols-1 gap-6 p-10 md:grid-cols-2 lg:grid-cols-3">
          {            
            books.slice(pagesVisited, pagesVisited + booksPerPage).map( (book , index)=>{

              const info = book.volumeInfo;
              const sale = book.saleInfo;
              const title = info.title || "untitled";
              const authors = info.authors?.join(',') || 'unknown';
              const image = info.imageLinks?.thumbnail;
              const price = sale?.listPrice?.amount;
              const preview = info.previewLink ;
              const desc = info.description || "no description available."
              return(
                <div key={index} className='group relative h-96 rounded-2xl bg-white p-5 shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-2xl'>
                   
                    <img src={image || "https://via.placeholder.com/150"} alt={title}
                       className='mb-4 h-48 w-full rounded-md object-cover' />
                    <h2 className='line-clamp-1 text-lg font-semibold'>{title}</h2>
                    <p className='line-clamp-1 text-sm text-gray-600'>{authors}</p>
                  {
                    price ? ( <p className='text-xl text-red-600'> ${price}</p> ) : ( <p className='text-xl text-red-600'> Free </p> )
                  }
                   <div className='gap- flex text-2xl text-yellow-400 md:text-3xl'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div>
                    
                  <div className='absolute left-1/2 top-1/4 flex -translate-x-1/2 items-center justify-center gap-10 overflow-hidden rounded-lg bg-blue-400 p-3 text-center text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'> 
                       <div onClick={()=>handleAddToWishlist(book)} className='cursor-pointer'><FaRegHeart/></div>
                       <div className='cursor-pointer'> <FaEye onClick={()=>handleopen(book)}/> </div> 
                      <div onClick={()=>handleAdd(book)} className='cursor-pointer'><IoCartOutline/></div> 
                  </div>
                    
                  <div className='flex items-center justify-center gap-10 rounded-lg bg-blue-400 p-2 text-center text-2xl text-white md:hidden'> 
                       <div onClick={()=>handleAddToWishlist(book)} className='cursor-pointer'><FaRegHeart/></div>
                       <div className='cursor-pointer'> <FaEye onClick={()=>handleopen(book)}/> </div> 
                      <div onClick={()=>handleAdd(book)} className='cursor-pointer'><IoCartOutline/></div> 
                  </div>
                  {/* <button onClick={()=>handleAdd(book)} className='my-2 flex w-full items-center justify-center rounded-xl bg-blue-400 p-2 text-white md:hidden'>Add-To-Cart</button> */}
                </div>
              );
            } 
          ) 
          }
         </div>
    )}

{/* pagination */}
  <div className="row mx-auto mt-6 flex items-center gap-2">
   <button
      className="rounded-md border border-blue-300 px-3 py-2 text-blue-600 hover:bg-blue-800 hover:text-white disabled:opacity-50"
      onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
      disabled={pageNumber === 0}> Prev
    </button>

    {Array.from({ length: pageCount }).map((_, i) => (
      <button
        key={i}
        className={`rounded-md border px-3 py-2 ${pageNumber === i ? 'bg-blue-800 text-white' : 'border-blue-300 text-blue-600'}`}     
        onClick={() => changePage({ selected: i })} >{ i+1 }</button>    
      ))}   

         <button      
         className="rounded-md border border-blue-300 px-3 py-2 text-blue-600 hover:bg-blue-800 hover:text-white disabled:opacity-50" 
         onClick={() => setPageNumber(Math.min(pageCount - 1, pageNumber + 1))}      
         disabled={pageNumber === pageCount - 1 }>  Next  </button>
  </div>

{/* Modal */}

    { selectedBook && (<div className="modal fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
            <div className="relative mx-5 w-full rounded-2xl bg-white p-2 md:w-1/2 md:p-5">
                <button className="absolute right-3 top-2 text-gray-500 hover:text-black" 
                onClick={handleClose}> <IoCloseSharp className='bg-red-700 text-2xl text-white'/></button>
                <div className='mb-5 flex gap-5'>
                <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={selectedBook.volumeInfo.title}
                 className="mask-auto object-cover text-center md:h-56 md:w-40"/>
                 <div>
                <h2 className="mb-2 font-semibold md:text-lg">{selectedBook.volumeInfo.title}</h2>
                <p className="mb-2 text-gray-400">{selectedBook.volumeInfo.authors?.join(',') || 'unknown'}</p>
               <p className="mt-2 font-semibold text-red-500">{selectedBook.saleInfo?.listPrice?.amount ? 
                `$${selectedBook.saleInfo.listPrice.amount}` : 'Free'}</p>
                <button  onClick={() => {
                    const url = selectedBook.volumeInfo.previewLink;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                    // else alert('Preview not available');
                  }} className='cursor-pointer font-semibold'>preview</button>
               </div> 
               </div>
                <p className="mt-5 max-h-48 overflow-y-auto indent-10 text-sm leading-5">{selectedBook.volumeInfo.description || "no description available."}</p>


                {/* <img src={selectedBook.image} alt=""  className="h-56 w-40 object-cover text-center"/>
                <h2 className="mb-2 text-center text-2xl font-semibold">{selectedBook.title}</h2>
                <p className="mb-3 text-center text-gray-400">{selectedBook.authors}</p>
                <p className="max-h-48 overflow-y-auto text-sm leading-5">{selectedBook.desc}</p>
                <p className="mt-3 text-center font-semibold">{selectedBook.price}</p> */}
    
            </div>
          </div>)}
    </div>
 )
}
