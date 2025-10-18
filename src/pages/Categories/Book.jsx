import { useContext } from 'react';
import './Book.css';
import { BookContext } from '../../context/BookContext';
// import { button, div } from 'framer-motion/client';
import { ImBook } from "react-icons/im";


export default function Book({value}){


    const {books , loading   , setSearchTerm} = useContext(BookContext);
    // const categories = ['programming' , 'fiction' , 'science' , 'history' , 'art']

    if(loading){
      return(
        <div className='flex items-center justify-center ' >
          <p className='text-xl'>loading books...</p>
        </div>
      )
    }
    return(
      <div className='max-w-6xl mx-auto p-6 flex flex-col'>
        <div className='mb-6 flex justify-center '>
          <input type="text" placeholder='search' onChange={(e)=>{ setSearchTerm(e.target.value)}}
          className='px-4 py-2 w-1/2 border rounded-2xl  focus:outline-none focus:ring-2 focus:ring-indigo-500' />
        </div>
        <h1 className='text-4xl font-bold mb-6 text-indigo-600 flex gap-2'>Books < ImBook /> </h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4  gap-6">
          {
            
            books.map( (book)=>{
              const info = book.volumeInfo;
              return(
                <div key={book.id} className='bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition'>
                  <img src={info.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={info.title}
                  className='w-full h-48 object-cover rounded-md mb-4' />

                  <h2 className='text-lg font-semibold'>{info.title}</h2>
                  <p className='text-gray-600 text-sm'>{info.authors? info.authors.join(","): "unknown author"}</p>
                  <a href={info.previewLink} target='_blank' rel='noopener noreferrer' 
                  className='mt-3 block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700'>preview </a>


                </div>
              );
            } 
          ) 
          }

         </div>
        </div>
    )


}
