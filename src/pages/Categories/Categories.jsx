
import './Categories.css';
import { motion, stagger } from 'framer-motion';
import { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { useNavigate } from 'react-router-dom';

export default function Categories(){

  const { setQuery  , getBook} = useContext(BookContext);
  const navigate = useNavigate();

  const categories = [ "Technology" ,"History" , "Ai"  , "Cooking" , "Health" , "Travel" ,  "Math" , "Poetry" , "Business" , "Comics"  , "Music" , "Sports" ];

  const handleCategory = (cat)=>{
    getBook(cat)
    setQuery(cat)
    navigate('/books')
  }

  const container = {
    hidden:{opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }
  const Item ={
    hidden: {opacity: 0, y: 100},
    show: {opacity: 1, y: 0 , transition:{duration: 0.5}},
  }

  return(
    <div className='py-10 mx-10'>

    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 z-200 " variants={container} initial="hidden" animate="show">

     { categories.map( (cat , index)=>(
      <motion.div 
      variants={Item}
      className='p-5 border border-blue-500 w-full text-center shadow-xl rounded text-2xl text-blue-950 cursor-pointer hover:bg-blue-200 hover:text-white hover:scale-105 transition-all duration-300'
      key={index} onClick={()=>handleCategory(cat)}>
        {cat}
      </motion.div>
      ))}

      {/* <motion.div 
      variants={Item}
      className='p-5 border border-blue-500 w-full text-center shadow-xl rounded text-2xl text-blue-950'>
        <a href="/books">Fiction</a>
      </motion.div>

      <motion.div 
      variants={Item}
      className='p-5 border border-blue-500 w-full text-center shadow-xl rounded text-2xl text-blue-950'>
        <a href="/books">History</a>
      </motion.div>

      <motion.div 
      variants={Item}
      className='p-5 border border-blue-500 w-full text-center shadow-xl rounded text-2xl text-blue-950'>
        <a href="/books">Since</a>
      </motion.div> */}

</motion.div>
</div>


  )
 


}

 

