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
  <div className="Orders w-full p-10"> 
  <h2 className='mb-4 text-2xl font-bold'>My Orders</h2>
   
   {
    orders.length === 0 ? (<p>No orders yet</p>) : ( 
      <table className='min-w-full border border-blue-400'>
        <thead>
          <tr className='bg-blue-50'>
          <td className='border border-blue-300 p-2'>  Order.no </td>
          <td className='border border-blue-300 p-2'>  Items </td>
          <td className='border border-blue-300 p-2'>  Total </td>
          <td className='border border-blue-300 p-2'>  Date </td>
          </tr>
        </thead>
        <tbody>
      { orders.map(order =>(
          <tr key={order.id} className='border border-blue-300 p-2'>
            <td className='border border-blue-300 p-2'>{order.id}</td>
            <td className='border border-blue-300 p-2'>{order.items.length}</td>
            <td className='border border-blue-300 p-2'>{order.total}</td>
            <td className='border border-blue-300 p-2'>{order.createdAt?.toDate().toLocaleString()|| '-'}</td>
          </tr>
          ))}
        </tbody>
      </table>
    )
   }
  
  
  </div>



)
}

export default Orders;
