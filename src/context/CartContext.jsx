import { createContext  , useContext , useState , useEffect} from "react";
import {toast} from "react-toastify";

export const CartCountext = createContext()

export const CartProvider = ({children}) =>{


    const [cartItems , setCartItems] = useState(()=>{
      try{
        const savedcart = localStorage.getItem('cart');
        return savedcart ? JSON.parse(savedcart) : [];
      }catch(err){
        console.error("invalid JSON in localStorage:" , err)
        return  [] ;
      }
});


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((p) => {
      const exists = p.find((i) => i.id === item.id);
      if (exists) {      
        return p.map((i) => i.id === item.id ? { ...i, quantity: (parseInt(i.quantity)||1) + (parseInt(item.quantity)||1) } : i);
      }
      return [...p, item];
    });
  };
  

      const handleAddToCart = (book) => {
      
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
          console.log('Books.handleAddToCart -> item:', item);
          try {
            addToCart(item);
           console.log('addToCart called');
          } catch (err) {
            console.error('addToCart failed:', err);
          }
        };



    const removeFromCart = (id) => {
        setCartItems((p) => p.filter((i) => i.id !== id));
    }


   const updateQuantity = (id, q) =>
        setCartItems((p) => p.map((i) => (i.id === id ? { ...i, quantity: q } : i)));


    const clearCart = () =>{
        setCartItems([]);
    }
    

    return <CartCountext.Provider value={ {
        cartItems , 
        addToCart ,
        removeFromCart ,
        updateQuantity ,
        clearCart ,
        handleAddToCart,
        
    }}>
          {children}
    </CartCountext.Provider>
}


export const useCart = () => {
    return useContext(CartCountext);
}