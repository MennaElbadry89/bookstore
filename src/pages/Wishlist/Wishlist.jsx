import {useEffect, useState , useContext} from 'react';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler'
import { useWishlist } from '../../context/WishlistContext';
import { BookContext } from '../../context/BookContext';
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'



export default function Wishlist() {
  
  const { wishlistItems = [], removeFromWishlist, clearWishlist } = useWishlist();
    
  const {currentUser, loadingDisplayCurrentUser} = useContext(AuthContext)
    
  const { loading  } = useContext(BookContext);

  const navigate = useNavigate()

  const[isOpen ,setIsOpen ]=  useState(false)
  const [removeItemId, setRemoveItemId] = useState(null)

  const[isOpenc ,setIsOpenc ]=  useState(false)

  const handleRemove = (id)=>{
    removeFromWishlist(id)
    setRemoveItemId(null)
    setIsOpen(false)
  }
    
  const handleclearWishlist = ()=>{
    clearWishlist()
    setIsOpenc(false)
  }

      useEffect(() => {
              if (!currentUser && !loadingDisplayCurrentUser) {
                  Swal.fire({
                      title: "Authentication Required",
                      text: "Please login or register to view your cart",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Register or Login",
                      cancelButtonText: "Cancel"
                  }).then((result) => {
                      if (result.isConfirmed) {
                          navigate('/register');
                      } else {
                          navigate('/');
                      }
                  });
              }
          }, [currentUser, loadingDisplayCurrentUser, navigate])
  
    if(loading){
        return <LottiHandeler status={'cart'}/>  
      }
       
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="Wishlist my-10 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-semibold text-blue-700">Your Wishlist is empty</h1>
        <a href='/books' className="text-blue-500">Click to add some books. </a >
      </div>
    );
  }


  return (
    <div className="Wishlist my-10 flex h-full w-full flex-col items-center">
      <h1 className="mb-6 text-3xl font-bold text-blue-700">Your Wishlist</h1>

      <div className="w-3/4 space-y-4">
        {wishlistItems.map((item) => (
          <div key={item.id} 
          className="flex w-full items-center justify-between rounded bg-white p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="h-15 w-15 rounded-md object-cover md:h-20 md:w-20"/>
              
              <div>
                <p className="hidden font-semibold md:block">{item.title || 'Untitled'}</p>
                <p className="hidden text-sm text-gray-600 md:block">by {item.author || 'Unknown'}</p>
                <p className="mt-1 font-medium text-red-600 max-md:text-sm"> {item.price ? `$${item.price}` : 'Free'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="btn rounded-lg bg-red-700 p-2 text-sm text-white hover:bg-red-600"
                onClick={()=>setRemoveItemId(item.id)} > Remove
              </button>
              {/* remove Modal */}
                          { removeItemId === item.id && ( <div className='z-100 fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-2/3 rounded bg-white p-2 shadow-lg md:w-1/3 md:p-5">
                              <h2 className="text-md my-5 text-center font-bold text-blue-700 md:text-lg">Are you sure to remove item?!</h2>                               
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setRemoveItemId(null)} className='cursor-pointer rounded-lg bg-blue-500 p-2 text-sm text-white'>cancel</button>
                                 <button onClick={() => handleRemove(item.id)} className='cursor-pointer rounded-lg bg-red-800 p-2 text-sm text-white' >confirm</button>
                            </div>                                                
                          </div>
                         </div> 
                         )}                         
            </div>
          </div>
        ))}

        <div className="mx-auto mt-4 flex items-center justify-center rounded bg-gray-50 p-4 md:p-2">
            <div className='flex gap-2'>
              <button
              className="rounded bg-red-600 p-2 text-sm text-white hover:bg-red-500"
              onClick={ ()=>navigate('/books')}> Shop now
            </button> 
                         
            <button
              className="rounded bg-red-600 p-2 text-sm text-white hover:bg-red-500"
              onClick={ ()=>setIsOpenc(true)}> Clear
            </button>
                          {/* clear Modal */}
                          { isOpenc && ( <div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-2/3 rounded bg-white p-5 shadow-lg md:w-1/3">
                              <h2 className="text-md my-5 text-center font-bold text-blue-700 md:text-2xl">Are you sure to clear cart?!</h2>                               
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setIsOpenc(false)} className='cursor-pointer rounded-lg bg-blue-500 p-2 text-sm text-white'>cancel</button>
                                 <button onClick={handleclearWishlist} className='cursor-pointer rounded-lg bg-red-800 p-2 text-sm text-white' >confirm</button>
                            </div>                                                
                          </div>
                         </div>  )}
            </div>
        </div>
      </div>
    </div>






  );
}