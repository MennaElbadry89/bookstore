import React, {useEffect, useState , useContext} from 'react';
import './Cart.css';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler'
import { useCart } from '../../context/CartContext';
import { BookContext } from '../../context/BookContext';
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { collection , addDoc , serverTimestamp } from 'firebase/firestore';
import { db , auth} from '../../firebase/firebase';



export default function Cart() {
  const { cartItems = [], setCartItems , removeFromCart, clearCart, updateQuantity,  } = useCart();
    
    const {currentUser, loadingDisplayCurrentUser} = useContext(AuthContext)
    
  const { loading  } = useContext(BookContext);

  const navigate = useNavigate()
  const[open ,setOpen ]=  useState(false)

  const[isOpen ,setIsOpen ]=  useState(false)
  const [removeItemId, setRemoveItemId] = useState(null)

  const[isOpenc ,setIsOpenc ]=  useState(false)

  const handleRemove = (id)=>{
    removeFromCart(id)
    setRemoveItemId(null)
    setIsOpen(false)
  }
    const handleclearCart = ()=>{
    clearCart()
    setIsOpenc(false)
  }

  const handleConfirm = async()=>{
    const user = auth.currentUser;
    if(!user){
      alert('login')
      return;
    }
      const order = {
        userId: user.uid,
        items: cartItems,
        total: cartItems.reduce((sum, item)=> sum + item.price * item.quantity ,0),
        createdAt: serverTimestamp()
      }
     try{ await addDoc(collection(db , 'orders'), order);
    clearCart()
    navigate('/orders')

    }catch(err){
      console.log('error'); 
    }
}

  const totalPrice = cartItems.reduce((a, b) => {
      const  total = a + (+(b.price) || 0) * (+(b.quantity) || 1)
    return total
  },0);



  const handleIncrease = (item) => {

    if(item.quantity >= 1){
      const newQty = (item.quantity)  + 1;   
      updateQuantity(item.id, newQty);
    }

  };

  const handleDecrease = (item) => {
   
    if(item.quantity > 1){
      const newQty = (item.quantity)  - 1;
      updateQuantity(item.id, newQty);
    }
  };
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
       


  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="Cart my-10 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-semibold text-blue-700">Your Cart is empty</h1>
        <a href='/books' className="text-blue-500">Click ot add some books. </a >
      </div>
    );
  }


  return (
    <div className="Cart my-10 flex w-full flex-col items-center">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      <div className="w-3/4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} 
          className="flex w-full items-center justify-between rounded bg-white p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="max-md:h-15 max-md:w-15 h-20 w-20 rounded-md object-cover"/>
              
              <div>
                <p className="font-semibold max-md:text-sm">{item.title || 'Untitled'}</p>
                <p className="text-sm text-gray-600 max-md:text-sm">by {item.author || 'Unknown'}</p>
                <p className="mt-1 font-medium text-red-600 max-md:text-sm"> {item.price ? `${item.price} $` : 'Free'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-500 max-md:text-sm"
                  onClick={() => handleIncrease(item)}> + 
                </button>

                <p className="min-w-[36px] text-center">{item.quantity || 1}</p>

                <button
                  className="rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-500 max-md:text-sm"
                  onClick={() => handleDecrease(item)}> -  
                </button>
              </div>

              <button
                className="btn rounded-lg bg-red-700 p-2 text-white hover:bg-red-600 max-md:text-sm"
                onClick={()=>setRemoveItemId(item.id)} > Remove
              </button>
              {/* remove Modal */}
                          { removeItemId === item.id && ( <div className='z-100 fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-1/3 rounded bg-white p-5 shadow-lg max-md:p-2">
                              <h2 className="max-md:text-md my-5 text-center text-2xl font-bold text-blue-700 max-md:text-lg">Are you sure to remove item?!</h2>                               
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setRemoveItemId(null)} className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white max-md:text-sm'>cancel</button>
                                 <button onClick={() => handleRemove(item.id)} className='cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-white max-md:text-sm' >confirm</button>
                            </div>                                                
                          </div>
                         </div>  )}
                         
            </div>
          </div>
        ))}

        <div className="mt-4 flex items-center justify-between rounded bg-gray-50 p-4 max-md:p-2">
          <h2 className="max-md:text-md text-lg font-semibold">Total Price :</h2>
          <div className="flex items-center gap-4">
            <p className="max-md:text-md text-xl font-bold">{totalPrice.toFixed(2)} $</p>
            <div className='flex gap-2'>
              <button
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              onClick={ ()=>setOpen(true)}> Checkout
            </button> 
{/* // Modal ckeckout */}

            { open && ( <div className='z-100 fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-2/3 rounded bg-white p-5 shadow-lg">
                              <h2 className="my-5 text-center text-2xl font-bold text-blue-700">confirm</h2>
                                 {
                                 cartItems.length === 0 ? ( <p className='text-blue-700'> Fill your cart to checkout </p>) : (
                                 <>
                                 <ul>
                                {cartItems.map((item)=>(
                                 <li key={item.id} className="flex items-center justify-between p-2 shadow-lg">
                                <span>{item.title}  <span className='text-red-500'>* {item.quantity} </span> </span> <span>{item.price * item.quantity} $</span>
                                 </li> ))}
                                 </ul>
                             <div className='flex items-center justify-between p-2 shadow-lg'>
                                  <span className="">Total: </span><span>{totalPrice} $</span>
                             </div>
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setOpen(false)} className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'>cancel</button>
                                 <button onClick={handleConfirm} className='cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-white' >confirm</button>
                            </div>                    
                             </>    ) }
                          </div>
                         </div>  )}
              
            <button
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              onClick={ ()=>setIsOpenc(true)}> Clear Cart
            </button>
                          {/* clear Modal */}
                          { isOpenc && ( <div className='z-100 fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-1/3 rounded bg-white p-5 shadow-lg">
                              <h2 className="my-5 text-center text-2xl font-bold text-blue-700">Are you sure to clear cart?!</h2>                               
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setIsOpenc(false)} className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'>cancel</button>
                                 <button onClick={handleclearCart} className='cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-white' >confirm</button>
                            </div>                                                
                          </div>
                         </div>  )}
            </div>
          </div>
        </div>
      </div>
    </div>






  );
}