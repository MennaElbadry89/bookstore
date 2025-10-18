import { useContext, useEffect , useState } from 'react';
import './Books.css';
import { BookContext } from '../../context/BookContext';
import { ImBook } from "react-icons/im";
import { GiOpenBook } from "react-icons/gi";

import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from '../../context/CartContext';
import  LottiHandeler from '../../assets/lottifiles/LottiHandeler';


export default function Books(){

   const { handleAddToCart } = useCart();

   //    const handleAddToCart = (book) => {
  
  //        const info = book.volumeInfo || {};
  //        const sale = book.saleInfo || {};
  //        const item = {
  //       id: book.id || book.etag || info.title,
  //       title: info.title || 'Untitled',
  //       author: info.authors?.[0] || 'Unknown',
  //       price: sale.listPrice?.amount || 0,
  //       quantity: 1,
  //       image: info.imageLinks?.thumbnail || '/images/placeholder.png',
  //       raw: book, // keep original for flexibility
  //     };
  //     console.log('Books.handleAddToCart -> item:', item);
  //     try {
  //       addToCart(item);
  //      console.log('addToCart called');
  //     } catch (err) {
  //       console.error('addToCart failed:', err);
  //     }
  //   };


    const {books , loading , getBook } = useContext(BookContext);

    const [selectedBook , setSelectedBook] = useState(null)


    useEffect(()=>{
         getBook('Ai')
    }, [])

    console.log('books state:' , books)

    const handleopen = (book)=>{
        setSelectedBook(book)

    }
    const handleClose = ()=>{
        setSelectedBook(null)
    }


 const [pageNumber, setPageNumber] = useState(0);
  const booksPerPage = 9;
  const pagesVisited = pageNumber * booksPerPage;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    if(loading){
      return <LottiHandeler status={'page'}/>  
    }
     

    return(
      <div className='max-w-6xl mx-auto p-6 flex flex-col'>
        <h1 className='text-4xl font-bold mb-6 mx-auto text-blue-600 flex gap-2'>Books < GiOpenBook /> </h1>
       {
         books.length === 0 ? (< p className='text-center '> No result found</p> ) :
       ( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4  gap-6 p-6">
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
                <div key={index} className='bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl h-96 group relative transition-all duration-300'>
                   
                    <img src={image || "https://via.placeholder.com/150"} alt={title}
                       className='w-full h-48 object-cover rounded-md mb-4' />
                    <h2 className='text-lg font-semibold line-clamp-1'>{title}</h2>
                    <p className='text-gray-600 text-sm line-clamp-1'>{authors}</p>
                  {
                    price ? ( <p className='text-xl text-red-600'> {price} $</p> ) : ( <p className='text-xl text-red-600'> Free </p> )
                  }
                   <div className='flex gap-1 text-yellow-400 text-3xl'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div>
                    <div className=' flex gap-10 overflow-hidden text-2xl items-center justify-center text-center bg-blue-400 text-white p-3 rounded-lg absolute top-1/4  left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'> 
                       <div className='cursor-pointer '><FaRegHeart/></div>
                       {/* <div className='cursor-pointer'><FaEye/></div>  */}
                       <div className='cursor-pointer '> <FaEye onClick={()=>handleopen(book)}/> </div> 
                      <div onClick={()=>handleAddToCart(book)} className='cursor-pointer'><IoCartOutline/></div> 
                    </div>
                </div>
              );
            } 
          ) 
          }
         </div>
    )}

{/* pagination */}
<div className="row flex mx-auto mt-6 items-center gap-2">
   <button
      className="px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:text-white hover:bg-blue-800 disabled:opacity-50"
      onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
      disabled={pageNumber === 0}> Prev
    </button>

    {Array.from({ length: pageCount }).map((_, i) => (
      <button
        key={i}
        className={`px-3 py-2 rounded-md border ${pageNumber === i ? 'bg-blue-800 text-white' : 'border-blue-300 text-blue-600'}`}     
        onClick={() => changePage({ selected: i })} >{ i+1 }</button>    
      ))}   

         <button      
         className="px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:text-white hover:bg-blue-800 disabled:opacity-50 " 
         onClick={() => setPageNumber(Math.min(pageCount - 1, pageNumber + 1))}      
         disabled={pageNumber === pageCount - 1 }>  Next  </button>
  </div>

{/* Modal */}

    { selectedBook && (<div className="modal fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-2xl p-5 w-1/3  relative">
                <button className="absolute top-2 right-3 text-gray-500 hover:text-black" 
                onClick={handleClose}> <IoCloseSharp className='text-2xl text-white bg-red-700'/></button>
                <div className='flex gap-5 mb-5'>
                <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={selectedBook.volumeInfo.title}
                 className="w-40 h-56 object-cover mask-auto text-center"/>
                 <div>
                <h2 className="text-lg font-semibold mb-2">{selectedBook.volumeInfo.title}</h2>
                <p className=" mb-3 text-gray-400 ">{selectedBook.volumeInfo.authors?.join(',') || 'unknown'}</p>
               <p className=" mt-3 font-semibold text-red-500">{selectedBook.saleInfo?.listPrice?.amount ? 
                `${selectedBook.saleInfo.listPrice.amount} $` : 'Free'}</p>
                <button  onClick={() => {
                    const url = selectedBook.volumeInfo.previewLink;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                    // else alert('Preview not available');
                  }} className='font-semibold cursor-pointer'>preview</button>
               </div> 
               </div>
                <p className="text-sm indent-10 mt-5 leading-5 max-h-48 overflow-y-auto">{selectedBook.volumeInfo.description || "no description available."}</p>


                {/* <img src={selectedBook.image} alt=""  className="w-40 h-56 object-cover text-center"/>
                <h2 className="text-center text-2xl font-semibold mb-2">{selectedBook.title}</h2>
                <p className="text-center mb-3 text-gray-400 ">{selectedBook.authors}</p>
                <p className="text-sm leading-5 max-h-48 overflow-y-auto">{selectedBook.desc}</p>
                <p className="text-center mt-3 font-semibold ">{selectedBook.price}</p> */}
    
            </div>
          </div>)}
    </div>
 )
}
