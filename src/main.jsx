import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from '@heroui/react'

import { BookProvider } from './context/BookContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CountryProvider } from './context/CountryContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ContactProvider } from "./context/ContactContext";





createRoot(document.getElementById('root')).render(
        <ContactProvider>

        <AuthContextProvider>          
        <CountryProvider>
        <WishlistProvider>
        <CartProvider>
        <HeroUIProvider>
        <BookProvider>
        
          <App />

        </BookProvider>
        </HeroUIProvider>
        </CartProvider>  
        </WishlistProvider>     
        </CountryProvider>
        </AuthContextProvider>

        </ContactProvider>




)
