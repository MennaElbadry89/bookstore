import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from '@heroui/react'

import { BookProvider } from './context/BookContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CountryProvider } from './context/CountryContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(

        <CartProvider>
        <AuthContextProvider>
        <CountryProvider>
        <HeroUIProvider>
        <BookProvider>
        
          <App />

        </BookProvider>
        </HeroUIProvider>
        </CountryProvider>
        </AuthContextProvider>
        </CartProvider>





)
