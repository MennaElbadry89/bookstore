import React, {useEffect, useState , useContext} from 'react';
import './Cart.css';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler'
import { useCart } from '../../context/CartContext';
import { BookContext } from '../../context/BookContext';
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { collection , addDoc , serverTimestamp } from 'firebase/firestore';
import { db , auth} from '../../firebase/firebase';



export default function Cart() {
  const [address, setAddress] = useState("");
  
  const { cartItems = [], removeFromCart, clearCart, updateQuantity,  } = useCart();
    
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
    <div className="Cart my-10 flex h-full w-full flex-col items-center">
      <h1 className="mb-6 text-3xl font-bold text-blue-700">Your Cart</h1>

      <div className="w-3/4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} 
          className="flex w-full items-center justify-between rounded bg-white p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="h-15 w-15 rounded-md object-cover md:h-20 md:w-20"/>
              
              <div>
                <p className="hidden font-semibold md:block">{item.title || 'Untitled'}</p>
                <p className="hidden text-sm text-gray-600 md:block">by {item.author || 'Unknown'}</p>
                <p className="mt-1 font-medium text-red-600 max-md:text-sm"> {item.price ? `${item.price} $` : 'Free'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button className="rounded-lg bg-blue-700 p-2 text-sm text-white hover:bg-blue-500"
                  onClick={() => handleIncrease(item)}> + 
                </button>

                <p className="text-center md:w-2">{item.quantity || 1}</p>

                <button  className="rounded-lg bg-blue-700 p-2 text-sm text-white hover:bg-blue-500"
                  onClick={() => handleDecrease(item)}> -  
                </button>
              </div>

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

        <div className="mt-4 flex items-center justify-between rounded bg-gray-50 p-4 md:p-2">
          <h2 className="text-md font-semibold">Total Price :</h2>
          <div className="flex items-center gap-4">
            <p className="text-md font-bold">{totalPrice.toFixed(2)} $</p>
            <div className='flex gap-2'>
              <button
              className="rounded bg-red-600 p-2 text-sm text-white hover:bg-red-500"
              onClick={ ()=>setOpen(true)}> Checkout
            </button> 
            
                                       {/* // Modal ckeckout */}
            { open && ( <div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-4/5 rounded bg-white p-2 shadow-lg md:p-5">
                              <h2 className="my-5 text-center text-xl font-bold text-blue-700 md:text-2xl">confirm</h2>
                                 {
                                 cartItems.length === 0 ? ( <p className='text-blue-700'> Fill your cart to checkout </p>) : (
                                 <>
                                 <ul>
                                {cartItems.map((item)=>(
                                 <li key={item.id} className="flex items-center justify-between p-2 shadow-lg">
                                    <span className='md:text-md text-sm'>{item.title}  <span className='text-red-500'>* {item.quantity} </span> </span> <span>${item.price * item.quantity}</span>
                                 </li> 
                                ))}
                                 </ul>
                             <div className='flex items-center justify-between p-2 shadow-lg'>
                                  <span className="">Total: </span><span>${totalPrice} </span>
                             </div>
                             <div>
                              <form onSubmit={(e)=>e.preventDefault} className='flex flex-col'>
                                <div className='mb-4 flex gap-2 max-md:flex-col'>
                                  <div className='flex w-full items-center justify-between p-2 shadow-lg'>
                                    <label className='font-semibold text-blue-700'>E-mail :</label>                          
                                    <input type="email" defaultValue={currentUser?.email} />
                                  </div>
                                  <div className='flex w-full items-center justify-between p-2 shadow-lg'>
                                    <label className='font-semibold text-blue-700'>Phone:</label>
                                    <input type="text" defaultValue={currentUser?.phone} />
                                  </div>
                                  </div>
                                  <label className='font-semibold text-blue-700'>Shipping Address :</label>
                                  <textarea  value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className='w-full rounded border border-gray-300 p-2' placeholder='Enter your shipping address here...'></textarea>

                              </form>
                              </div>
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setOpen(false)} className='cursor-pointer rounded-lg bg-blue-500 p-2 text-sm text-white'>cancel</button>
                                 {/* <button onClick={ handleConfirm } className='max-md:text-md cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-white' >confirm</button> */}
                                <button  disabled={!address.trim()}
                                   onClick={handleConfirm}  className={`rounded-lg p-2 text-sm text-white
                                   ${address.trim() ? "cursor-pointer bg-red-800" : "cursor-not-allowed bg-red-300"}`} >confirm  </button>            
                            </div>                    
                             </>    ) }
                          </div>
                         </div>  )}
              
            <button
              className="rounded bg-red-600 p-2 text-sm text-white hover:bg-red-500"
              onClick={ ()=>setIsOpenc(true)}> Clear Cart
            </button>
                          {/* clear Modal */}
                          { isOpenc && ( <div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/40'>
                            <div className="mx-auto mt-10 w-2/3 rounded bg-white p-5 shadow-lg md:w-1/3">
                              <h2 className="text-md my-5 text-center font-bold text-blue-700 md:text-2xl">Are you sure to clear cart?!</h2>                               
                            <div className='mt-5 flex items-center justify-center gap-1'>
                                 <button onClick={()=>setIsOpenc(false)} className='cursor-pointer rounded-lg bg-blue-500 p-2 text-sm text-white'>cancel</button>
                                 <button onClick={handleclearCart} className='cursor-pointer rounded-lg bg-red-800 p-2 text-sm text-white' >confirm</button>
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