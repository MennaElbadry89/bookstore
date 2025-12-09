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
  const booksPerPage = 6;
  const pagesVisited = pageNumber * booksPerPage;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    if(loading){
      return <LottiHandeler status={'page'}/>  
    }
     

    return(
      <div className='mx-20 flex flex-col p-6 max-md:mx-10'>
        <h1 className='mx-auto mb-6 flex gap-2 text-4xl font-bold text-blue-600'>Books < GiOpenBook /> </h1>
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
                    price ? ( <p className='text-xl text-red-600'> {price} $</p> ) : ( <p className='text-xl text-red-600'> Free </p> )
                  }
                   <div className='flex gap-1 text-3xl text-yellow-400'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div>
                    <div className='absolute left-1/2 top-1/4 flex -translate-x-1/2 items-center justify-center gap-10 overflow-hidden rounded-lg bg-blue-400 p-3 text-center text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'> 
                       <div className='cursor-pointer'><FaRegHeart/></div>
                       {/* <div className='cursor-pointer'><FaEye/></div>  */}
                       <div className='cursor-pointer'> <FaEye onClick={()=>handleopen(book)}/> </div> 
                      <div onClick={()=>handleAddToCart(book)} className='cursor-pointer'><IoCartOutline/></div> 
                    </div>
                  <button onClick={()=>handleAddToCart(book)} className='my-2 w-full rounded-xl bg-blue-400 p-2 text-white max-md:flex md:hidden'>Add-To-Cart</button>
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
            <div className="relative w-1/2 rounded-2xl bg-white p-5 max-md:mx-10 max-md:w-full">
                <button className="absolute right-3 top-2 text-gray-500 hover:text-black" 
                onClick={handleClose}> <IoCloseSharp className='bg-red-700 text-2xl text-white'/></button>
                <div className='mb-5 flex gap-5'>
                <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={selectedBook.volumeInfo.title}
                 className="mask-auto h-56 w-40 object-cover text-center"/>
                 <div>
                <h2 className="mb-2 text-lg font-semibold">{selectedBook.volumeInfo.title}</h2>
                <p className="mb-3 text-gray-400">{selectedBook.volumeInfo.authors?.join(',') || 'unknown'}</p>
               <p className="mt-3 font-semibold text-red-500">{selectedBook.saleInfo?.listPrice?.amount ? 
                `${selectedBook.saleInfo.listPrice.amount} $` : 'Free'}</p>
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
