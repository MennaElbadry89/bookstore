import { useContext , useEffect , useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import  LottiHandeler from '../../assets/lottifiles/LottiHandeler' ;
import { BookContext } from "../../context/BookContext";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from "../../context/CartContext";

export default function BestSale(){
    const { books , loading , getBook } = useContext(BookContext);
    const { handleAddToCart } = useCart();
    

    // const bestBooks = books.filter(book => book.saleInfo?.listPrice?.amount > 20);
    const [selectedBook , setSelectedBook] = useState(null)
        const [bestBooks , setBestBooks] = useState([])
    
            
        const handleopen = (book)=>{
            setSelectedBook(book)
    
        }
        const handleClose = ()=>{
            setSelectedBook(null)
        }
        
function filterBooks(books, options = {}) {
  return books.filter(book => {
    const volume = book.volumeInfo || {};
    const sale = book.saleInfo || {};

    if (options.title) {
      if (!volume.title?.toLowerCase().includes(options.title.toLowerCase()))
        return false;
    }

    if (options.author) {
      if (!volume.authors?.some(a => a.toLowerCase().includes(options.author.toLowerCase())))
        return false;
    }

    if (options.minPages) {
      if (!(volume.pageCount > options.minPages)) return false;
    }

    if (options.afterYear) {
      const year = Number(volume.publishedDate?.substring(0, 4));
      if (!(year > options.afterYear)) return false;
    }

    if (options.language) {
      if (volume.language !== options.language) return false;
    }

    if (options.minPrice) {
      if (!(sale.listPrice?.amount > options.minPrice)) return false;
    }

    return true;
  });
}

        useEffect(()=>{
        const filterdBooks = filterBooks(books, { language: "en" });
                setBestBooks(filterdBooks)
                console.log("Best sale books:" , bestBooks)   
        } , [books ])
         
        useEffect(()=> {
        console.log("Best sale books:", bestBooks);
        }, [bestBooks])
        

    const [sliderRef , instanceRef] = useKeenSlider({
        // loop: true,
        mode: "free",
        slides: {
            perView: 4,
            spacing: 10,
            // origin: "center",
        },
        breakpoints: {
            "(max-width: 1024px)": { slides: { perView: 4 , spacing: 10}, },
            "(max-width: 768px)": {  slides: { perView: 3 , spacing: 15},},
            "(max-width: 480px)": {slides: { perView: 1 , spacing: 20},},
    }
});
  // autoplay guard and update when slides change
    useEffect(() => {
        // request an update when slide count changes
        if (instanceRef?.current && typeof instanceRef.current.update === 'function') {
            instanceRef.current.update();
        }
        const id = setInterval(() => {            
            if (instanceRef?.current && typeof instanceRef.current.next === 'function') {
                instanceRef.current.next();
            }
        }, 2000);
        return () => clearInterval(id);
    }, [instanceRef, bestBooks.length]);


    if(loading){
        return  <LottiHandeler  status={'page'} /> 
      }

    return(
    <>
        <div className="mb- flex w-full flex-col p-6">
            <h2 className="mb-6 text-3xl font-bold text-blue-600">BestSeller</h2>

{bestBooks.length > 0 ? (
           <div ref={sliderRef} className="keen-slider w-full bg-blue-50 p-10">
                
                { bestBooks.map( (book , index)=>{
                        const info = book.volumeInfo;
                        const title = info.title || "untitled";
                        const authors = info.authors?.join(',') || 'unknown';
                        const image = info.imageLinks?.thumbnail;
                        const desc = info.description || "no description available."
                        const preview = info.previewLink ;
                        const sale = book.saleInfo;
                        const price = sale?.listPrice?.amount || "Free";

                        return(
                            <div key={index} className='keen-slider__slide relative h-96 rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-2xl'>
                                <div className="absolute right-0 top-5 bg-green-200 p-3 font-extrabold text-blue-700">BestSeller</div>
                                <img src={image || "https://via.placeholder.com/150"} alt={title}
                                   className='mb-4 h-48 w-full rounded-md object-cover' />
                                <h2 className='line-clamp-1 text-lg font-semibold'>{title}</h2>
                                <p className='line-clamp-1 text-sm text-gray-600'>by {authors}</p>
                                <p className='line-clamp-1 text-sm text-red-600'>{price}</p>
                                <div className='flex gap-1 text-3xl text-yellow-400'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div>
                                <div className='flex items-center justify-center gap-10 overflow-hidden rounded-lg bg-blue-300 p-3 text-center text-2xl text-white max-md:gap-5'> 
                                 <div className='cursor-pointer'><FaRegHeart/></div>
                                <div className='cursor-pointer'> <FaEye onClick={()=>handleopen(book)}/> </div> 
                                 <div className='cursor-pointer'><IoCartOutline onClick={()=>handleAddToCart(book)}/></div>
                                </div>
                            </div>
                        )
                    })
                } 
          
            </div> ) : (
             <p className="text-gray-600">No bestsellers found.</p>
           )}
            </div> 

{/* Modal */}

            { selectedBook && (<div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
                  }} className='cursor-pointer font-semibold'>preview</button>
               </div> 
               </div>
                <p className="mt-5 max-h-48 overflow-y-auto indent-10 text-sm leading-5">{selectedBook.volumeInfo.description || "no description available."}</p>
            </div>
          </div>)}
</>
    )
}