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
        
    
        useEffect(()=>{
                setBestBooks(books.filter(book => book.saleInfo?.listPrice?.amount > 20))
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
            spacing: 25,
            // origin: "center",
        },
        breakpoints: {
            "(max-width: 1024px)": { slides: { perView: 4 , spacing: 5}, },
            "(max-width: 768px)": {  slides: { perView: 2 , spacing: 10},},
            "(max-width: 480px)": {slides: { perView: 1 , spacing: 15},},
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
        <div className="mt-2 w-full p-6 flex flex-col mb-2">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">BestSeller</h2>

{bestBooks.length > 0 ? (
           <div ref={sliderRef} className="keen-slider bg-blue-200 w-full p-5">
                
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
                            <div key={index} className='relative keen-slider__slide bg-white shadow-lg rounded-2xl  p-5 hover:shadow-2xl h-96 transition-all duration-300'>
                                <div className="bg-red-200 text-blue-700 p-3 absolute top-5 right-0">BestSeller</div>
                                <img src={image || "https://via.placeholder.com/150"} alt={title}
                                   className='w-full h-48 object-cover rounded-md mb-4' />
                                <h2 className='text-lg font-semibold line-clamp-1'>{title}</h2>
                                <p className='text-sm text-gray-600 line-clamp-1'>by {authors}</p>
                                <p className='text-sm text-red-600 line-clamp-1'>{price}</p>
                                <div className='flex gap-1 text-yellow-400 text-3xl'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div>
                                <div className=' flex gap-10 overflow-hidden text-2xl items-center justify-center text-center bg-blue-300 text-white p-3 rounded-lg '> 
                                 <div className='cursor-pointer '><FaRegHeart/></div>
                                <div className='cursor-pointer '> <FaEye onClick={()=>handleopen(book)}/> </div> 
                                 <div className='cursor-pointer '><IoCartOutline onClick={()=>handleAddToCart(book)}/></div>
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

            { selectedBook && (<div className="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-5 w-1/2 relative">
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
                  }} className='font-semibold cursor-pointer'>preview</button>
               </div> 
               </div>
                <p className="text-sm indent-10 mt-5 leading-5 max-h-48 overflow-y-auto">{selectedBook.volumeInfo.description || "no description available."}</p>
            </div>
          </div>)}
</>
    )
}