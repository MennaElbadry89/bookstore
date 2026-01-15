import React from 'react';
import './Orders.css';
import { useCart } from '../../context/CartContext';
import { useEffect , useState } from 'react';
import { collection , query , where , getDocs , orderBy } from 'firebase/firestore';
import { db , auth} from '../../firebase/firebase';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler';

function Orders(){
const {cartItems} = useCart()

  const [orders , setOrders] = useState([])
  const [loading , setLoading] = useState(true)
  // const [selectedOrder ,setSelectedOrder] = useState(false)

  useEffect(()=>{
    const fetchOrders = async()=>{
      const user = auth.currentUser;
      if(! user) return;
      const q = query(
        collection(db , 'orders'),
        where('userId', '==' , user.uid),
        orderBy('createdAt' , 'desc')
      );
      const querySnapshot = await getDocs(q)
       const data = querySnapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
       }));
       setOrders(data)
       setLoading(false)
    }
    fetchOrders()
  }, [])

  if(loading){
    return <LottiHandeler status={'page'}/>
  }



return(
  <div className="Orders mx-0 flex flex-col items-center justify-center p-10"> 
  <h2 className='m-4 text-center text-2xl font-bold text-blue-600 md:text-4xl'>Your Orders</h2>
   <div className='mx-auto flex w-full items-center justify-center p-5 md:w-3/4'>
   {
    orders.length === 0 ? (<p>No orders yet</p>) : ( 
      <table className='md:text-md w-full overflow-hidden border border-blue-400 text-sm'>
        <thead>
          <tr className='bg-blue-50 text-center'>
          <td className='hidden border border-blue-300 p-2 md:block'>  Order.no </td>
          <td className='border border-blue-300 p-2'>  Items </td>
          <td className='border border-blue-300 p-2'>  Total </td>
          <td className='border border-blue-300 p-2'>  Date </td>
          </tr>
        </thead>
        <tbody> 
      { orders.map(order =>(
          <tr key={order.id} className='overflow-hidden border border-blue-300 text-center'>
            <td className='hidden border border-blue-300 p-2 md:block'>{order.id}</td>
            <td className='border border-blue-300 p-2'>
              <div className='flex flex-wrap gap-1'>
                {order.items.map((item, index) => <img key={index} src={item.image} alt="" className='h-5 w-5'/>)}
              </div>
            </td>
            <td className='border border-blue-300 p-2'>{order.total}</td>
            <td className='border border-blue-300 p-2'>{order.createdAt?.toDate().toLocaleString()|| '-'}</td>
          </tr>
          ))}
        </tbody>
      </table>
    )
   }
  </div>
  
  </div>



)
}

export default Orders;
