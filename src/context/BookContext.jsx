import { createContext , useState , useEffect } from "react";
import axios from "axios";

export const BookContext = createContext();

export const BookProvider = ({children}) =>{

   const [books , setBooks] = useState([]);
   const [loading , setLoading] = useState(false);
   const [query , setQuery] = useState("");
//    const API_KEY  = "AIzaSyCiq60mgjFY9FLJlYQ_KtZ-x7qALNs5s98" ;

 const getBook = async (query) =>{
    try {
    setLoading(true);
     
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
    console.log("API Data:" , res.data)
    
        if(res.data?.items &&  Array.isArray(res.data.items)){
            console.log("setting books:" , res.data.items.length)
            setBooks(res.data.items );       
        }else{
            console.log("no items found")
            setBooks([])
        }
    } catch (error) {
        console.log("Error fetching books:" , error)       
        setLoading(false)
        setBooks([])
    }finally{
        setLoading(false)
    }
}

   useEffect(()=>{  
    
        getBook(); 
    
    } , [query ]);


   return (
    <BookContext.Provider value={{books , loading ,  getBook  , setQuery }}>
        {children}
    </BookContext.Provider>
   )
}