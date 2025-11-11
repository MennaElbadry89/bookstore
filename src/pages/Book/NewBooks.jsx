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
        <div className="w-full mx-auto p-6 flex flex-col  ">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">New Releases</h2>

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

            { books &&  (  <div className="overflow-x-auto mt-5 bg-blue-50" >
          <div className=" flex flex-nowrap gap-6  w-max  p-10" style={{scrollBehavior: "auto"}} >
                
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
                            <div key={index} className='relative  bg-white shadow-lg rounded-2xl min-w-[200px] max-w-[220px] flex-shrink-0 p-5 hover:shadow-2xl h-96 transition-all duration-300'>
                                <div className="bg-yellow-300 font-extrabold text-blue-700 p-3 absolute top-5 right-0">New</div>
                                <img src={image || "https://via.placeholder.com/150"} alt={title}
                                   className='w-full h-48 object-cover rounded-md mb-4' />
                                <h2 className='text-lg font-semibold line-clamp-1'>{title}</h2>
                                <p className='text-sm text-gray-600 line-clamp-1'>by {authors}</p>
                                <p className='text-sm text-red-600 line-clamp-1'>{price}</p>
                                {/* <div className='flex gap-1 text-yellow-400 text-3xl'><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/> </div> */}
                                <div className=' flex gap-10 overflow-hidden text-2xl items-center justify-center text-center bg-blue-300 text-white p-3 rounded-lg '> 
                                 {/* <div className='cursor-pointer '><FaRegHeart/></div> */}
                                <div className='cursor-pointer '> <FaEye onClick={()=>handleopen(book)}/> </div> 
                                 <div className='cursor-pointer '><IoCartOutline onClick={()=>handleAddToCart(book)}/></div>
                                </div>
                            </div>
                        )
                    })
                }              
            </div>

        </div> )}


            {/* Modal */}

            { selectedBook && (<div className="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-5 w-1/2 relative max-md:w-full max-md:mx-10">
                <button className="absolute top-2 right-3 text-gray-500 hover:text-black" 
                onClick={handleClose}> <IoCloseSharp className='text-2xl text-white bg-red-700'/></button>
                <div className='flex gap-5 mb-5 '>
                <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={selectedBook.volumeInfo.title}
                 className="w-40 h-56 object-cover mask-auto text-center max-md:w-20 max-md:h-28"/>
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
        </div>
    )
}