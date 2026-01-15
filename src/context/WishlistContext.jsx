import { createContext  , useContext , useState , useEffect} from "react";

export const WishlistContext = createContext()

export const WishlistProvider = ({children}) =>{

    const [wishlistItems , setWishlistItems] = useState(()=>{
      try{
        const savedwishlist = localStorage.getItem('wishlist');
        return savedwishlist ? JSON.parse(savedwishlist) : [];
      }catch(err){
        console.error("invalid JSON in localStorage:" , err)
        return  [] ;
      }
});
    let quantity = 0 ;

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      }, [wishlistItems]);

  const addToWishlist = (item) => {
    setWishlistItems((p) => {
      const exists = p.find((i) => i.id === item.id);
      if (exists) {      
        return p.map((i) => i.id === item.id ? { ...i, quantity: (parseInt(i.quantity)||1) + (parseInt(item.quantity)||1) } : i);
      }
      return [...p, item];
    });
  };
  

      const handleAddToWishlist = (book) => {

          const info = book.volumeInfo || {};
          const sale = book.saleInfo || {};
          const item = {
            id: book.id || book.etag || info.title,
            title: info.title || 'Untitled',
            author: info.authors?.[0] || 'Unknown',
            price: sale.listPrice?.amount || 0,
            quantity: 1,
            image: info.imageLinks?.thumbnail || '/images/placeholder.png',
            raw: book, // keep original for flexibility
            };
          console.log('Books.handleAddToWishlist -> item:', item);
          try {
            addToWishlist(item);
           console.log('addToWishlist called');
          } catch (err) {
            console.error('addToWishlist failed:', err);
          }
        };
        

    const removeFromWishlist = (id) => {
        setWishlistItems((p) => p.filter((i) => i.id !== id));
    }

    quantity +=  wishlistItems.length

   
    const clearWishlist = () =>{
        setWishlistItems([]);
    }
    

    return <WishlistContext.Provider value={ {
        wishlistItems , 
        addToWishlist ,
        removeFromWishlist ,
        quantity ,
        clearWishlist ,
        handleAddToWishlist,
        
    }}>
          {children}
    </WishlistContext.Provider>
}


export const useWishlist = () => {
    return useContext(WishlistContext);
}