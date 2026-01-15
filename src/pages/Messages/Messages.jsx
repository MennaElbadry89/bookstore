// import React from 'react';
// import '/TemplateName.css'

// function TemplateName(){
//   return(
//   <div className='TemplateName'>
//     TemplateName Component
//   </div>
//   )
// };



// export default TemplateName;
import React from 'react';
import { useEffect , useState } from 'react';
import { collection , query , where , getDocs , orderBy } from 'firebase/firestore';
import { db , auth} from '../../firebase/firebase';
import LottiHandeler from '../../assets/lottifiles/LottiHandeler';

export default function Messages(){

  const [messages , setMessages] = useState([])
  const [loading , setLoading] = useState(true)
  // const [selectedOrder ,setSelectedOrder] = useState(false)

  useEffect(()=>{
    const fetchMessages = async()=>{
      // const user = auth.currentUser;
      // if(! user) return;
      const q = query(
        collection(db , 'contacts'),
        // where('userId', '==' , user.uid),
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
   <div className='mx-auto flex w-full items-center justify-center p-5 md:w-3/4'>
   {
    messages.length === 0 ? (<p>No messages yet</p>) : ( 
      <table className='md:text-md w-full overflow-hidden border border-blue-400 text-sm'>
        <thead>
          <tr className='bg-blue-50 text-center'>
          <td className='hidden border border-blue-300 p-2 md:block'>  Name </td>
          <td className='border border-blue-300 p-2'>  E-mail </td>
          <td className='border border-blue-300 p-2'>  Message </td>
          <td className='border border-blue-300 p-2'>  Date </td>
          </tr>
        </thead>
        <tbody> 
      { messages.map(message =>(
          <tr key={message.id} className='overflow-hidden border border-blue-300 text-center'>
            <td className='hidden border border-blue-300 p-2 md:block'>{message.name}</td>
            <td className='border border-blue-300 p-2'>{message.email}</td>
            <td className='border border-blue-300 p-2'>{message.message}</td>
            <td className='border border-blue-300 p-2'>{message.createdAt?.toDate().toLocaleString()|| '-'}</td>
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


