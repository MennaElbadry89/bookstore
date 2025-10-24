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
      <div className="Cart flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl text-blue-700 font-semibold mb-4">Your Cart is empty</h1>
        <a href='/books' className="text-blue-500 ">Click ot add some books. </a >
      </div>
    );
  }


  return (
    <div className="Cart flex flex-col items-center my-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="w-3/4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} 
          className="flex items-center justify-between w-full shadow-lg rounded p-4 bg-white">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 rounded-md object-cover"/>
              
              <div>
                <p className="font-semibold">{item.title || 'Untitled'}</p>
                <p className="text-sm text-gray-600">by {item.author || 'Unknown'}</p>
                <p className="text-red-600 font-medium mt-1"> {item.price ? `${item.price} $` : 'Free'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="bg-blue-700 hover:bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => handleIncrease(item)}> + 
                </button>

                <p className="min-w-[36px] text-center">{item.quantity || 1}</p>

                <button
                  className="bg-blue-700 hover:bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => handleDecrease(item)}> -  
                </button>
              </div>

              <button
                className="btn bg-red-700 hover:bg-red-600 text-white p-2 rounded-lg"
                onClick={()=>setRemoveItemId(item.id)} > Remove
              </button>
              {/* remove Modal */}
                          { removeItemId === item.id && ( <div className='fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40 z-100'>
                            <div className="w-1/3 mx-auto mt-10 p-5 bg-white shadow-lg rounded">
                              <h2 className="text-2xl text-center text-blue-700 my-5 font-bold ">Are you sure to remove item?!</h2>                               
                            <div className='flex items-center justify-center mt-5 gap-1'>
                                 <button onClick={()=>setRemoveItemId(null)} className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'>cancel</button>
                                 <button onClick={() => handleRemove(item.id)} className='bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer' >confirm</button>
                            </div>                                                
                          </div>
                         </div>  )}
                         
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-semibold">Total Price :</h2>
          <div className="flex items-center gap-4">
            <p className="text-xl font-bold">{totalPrice.toFixed(2)} $</p>
            <div className='flex gap-2'>
              <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={ ()=>setOpen(true)}> Checkout
            </button> 
{/* // Modal ckeckout */}

            { open && ( <div className='fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40 z-100'>
                            <div className="w-2/3 mx-auto mt-10 p-5 bg-white shadow-lg rounded">
                              <h2 className="text-2xl text-center text-blue-700 my-5 font-bold ">confirm</h2>
                                 {
                                 cartItems.length === 0 ? ( <p className='text-blue-700 '> Fill your cart to checkout </p>) : (
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
                            <div className='flex items-center justify-center mt-5 gap-1'>
                                 <button onClick={()=>setOpen(false)} className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'>cancel</button>
                                 <button onClick={handleConfirm} className='bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer' >confirm</button>
                            </div>                    
                             </>    ) }
                          </div>
                         </div>  )}
              
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={ ()=>setIsOpenc(true)}> Clear Cart
            </button>
                          {/* clear Modal */}
                          { isOpenc && ( <div className='fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black/40 z-100'>
                            <div className="w-1/3 mx-auto mt-10 p-5 bg-white shadow-lg rounded">
                              <h2 className="text-2xl text-center text-blue-700 my-5 font-bold ">Are you sure to clear cart?!</h2>                               
                            <div className='flex items-center justify-center mt-5 gap-1'>
                                 <button onClick={()=>setIsOpenc(false)} className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'>cancel</button>
                                 <button onClick={handleclearCart} className='bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer' >confirm</button>
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