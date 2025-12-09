import  LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { useContext , useEffect , useState } from "react";
import { Slider } from "@heroui/react";
import { BookContext } from "../../context/BookContext";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from "../../context/CartContext";


export default function NewBooks(){
        const { handleAddToCart } = useCart();
           
    const { books , loading , getBook } = useContext(BookContext);
    const [newBooks , setNewBooks] = useState([])
    const [count , setCount] = useState(10)

    const [selectedBook , setSelectedBook] = useState(null)
        
    const handleopen = (book)=>{
        setSelectedBook(book)

    }
    const handleClose = ()=>{
        setSelectedBook(null)
    }
    

    useEffect(()=>{
            setNewBooks(books.slice(0,count))

    } , [books , count])



    if(loading){
        return <LottiHandeler status={'page'}/>
      }

    return(
        <div className="mx-auto flex w-full flex-col p-6">
            <h2 className="mb-6 text-3xl font-bold text-blue-600">New Releases</h2>

             <div className="hidden">
                <Slider
                    label={`Just arrived`}
                    name="booksCount"
                    id="booksCount"
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    showTooltip
                    color="primary"
                    className="w-full"
                />

             </div>

            { books &&  (  <div className="mt-5 overflow-x-auto bg-blue-50" >
          <div className="flex w-max flex-nowrap gap-6 p-10" style={{scrollBehavior: "auto"}} >
                
                {  (books.slice(0,count)).map( (book , index)=>{
                        const info = book.volumeInfo;
                        const title = info.title || "untitled";
                        const authors = info.authors?.join(',') || 'unknown';
                        const image = info.imageLinks?.thumbnail;
                        const desc = info.description || "no description available."
                        const preview = info.previewLink ;
                        const sale = book.saleInfo;
                        const price = sale?.listPrice?.amount || "Free";

                        return(
                            <div key={index} className='relative h-96 min-w-[200px] max-w-[220px] flex-shrink-0 rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-2xl'>
                                <div className="absolute right-0 top-5 bg-yellow-300 p-3 font-extrabold text-blue-700">New</div>
                                <img src={image || "https://via.placeholder.com/150"} alt={title}
                                   className='mb-4 h-48 w-full rounded-md object-cover' />
                                <h2 className='line-clamp-1 text-lg font-semibold'>{title}</h2>
                                <p className='line-clamp-1 text-sm text-gray-600'>by {authors}</p>
                                <p className='line-clamp-1 text-sm text-red-600'>{price}</p>
                                {/* <div className='flex gap-1 text-3xl text-yellow-400'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div> */}
                                <div className='flex items-center justify-center gap-10 overflow-hidden rounded-lg bg-blue-300 p-3 text-center text-2xl text-white max-md:gap-5'> 
                                 <div className='cursor-pointer'><FaRegHeart/></div>
                                <div className='cursor-pointer'> <FaEye onClick={()=>handleopen(book)}/> </div> 
                                 <div className='cursor-pointer'><IoCartOutline onClick={()=>handleAddToCart(book)}/></div>
                                </div>
                            </div>
                        )
                    })
                }              
            </div>

        </div> )}


            {/* Modal */}

            { selectedBook && (<div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-1/2 rounded-2xl bg-white p-5 max-md:mx-10 max-md:w-full">
                <button className="absolute right-3 top-2 text-gray-500 hover:text-black" 
                onClick={handleClose}> <IoCloseSharp className='bg-red-700 text-2xl text-white'/></button>
                <div className='mb-5 flex gap-5'>
                <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={selectedBook.volumeInfo.title}
                 className="mask-auto h-56 w-40 object-cover text-center max-md:h-28 max-md:w-20"/>
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
        </div>
    )
}