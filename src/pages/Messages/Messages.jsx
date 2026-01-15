import { useEffect , useState } from 'react';
import { collection , query , where , getDocs , orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler';

export default function Messages(){

  const [messages , setMessages] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    const fetchMessages = async()=>{
      const q = query(
        collection(db , 'contacts'),
        orderBy('createdAt' , 'desc')
      );
      const querySnapshot = await getDocs(q)
       const data = querySnapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
       }));
       setMessages(data)
       setLoading(false)
    }
    fetchMessages()
  }, [])

  if(loading){
    return <LottiHandeler status={'page'}/>
  }



return(
  <div className="Orders mx-0 flex flex-col items-center justify-center p-10"> 
  <h2 className='m-4 text-center text-2xl font-bold text-blue-600 md:text-4xl'>Contact Messages</h2>
   <div className='mx-5 flex w-3/4 items-center justify-center p-5'>
   {
    messages.length === 0 ? (<p>No messages yet</p>) : ( 
      <table className='md:text-md w-full border border-blue-400 text-sm'>
        <thead>
          <tr className='bg-blue-50 text-center'>
          <td className='border border-blue-300 p-2'>  Name </td>
          <td className='border border-blue-300 p-2'>  E-mail </td>
          <td className='border border-blue-300 p-2'>  Message </td>
          <td className='border border-blue-300 p-2'>  Date </td>
          </tr>
        </thead>
        <tbody> 
      { messages.map(message =>(
          <tr key={message.id} className='border border-blue-300 text-center'>
            <td className='border border-blue-300 p-1'>
              <div className='flex flex-wrap text-center'>{message.name}</div></td>
            <td className='border border-blue-300 p-1'>
              <div className='flex flex-wrap text-center'>{message.email}</div></td>
            <td className='border border-blue-300 p-1'>
              <div className='flex flex-wrap text-center'>{message.message}</div></td>
            <td className='border border-blue-300 p-1'>{message.createdAt?.toDate().toLocaleString()|| '-'}</td>
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


