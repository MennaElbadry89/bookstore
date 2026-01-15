import React from "react";
import { lazy , Suspense } from 'react';
import LottiHandeler from "./assets/lottifiles/LottiHandeler.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";


import { createBrowserRouter , RouterProvider} from  'react-router-dom'
const Layout = lazy(()=> import('./Layout/Layout'))
const Home = lazy(()=> import('./pages/Home/Home'))
const About = lazy(()=> import('./pages/About/About'))
const Contact = lazy(()=> import('./pages/Contact/Contact'))
const Books = lazy(()=> import('./pages/Book/Books'))
const Shop = lazy(()=> import('./pages/Book/Books'))
const Categories = lazy(()=> import('./pages/Categories/Categories'))
const Cart = lazy(()=> import('./pages/Cart/Cart'))
const Wishlist = lazy(()=> import('./pages/Wishlist/Wishlist'))
const Orders = lazy(()=> import('./pages/Orders/Orders'))
const Register = lazy(()=> import('./pages/auth/Register'))
const Login = lazy(()=> import('./pages/auth/Login'))
const Profile = lazy(()=> import('./pages/Profile/Profile'))


export default function App(){

const router = createBrowserRouter([
    {
      path : '/',
        element : <Suspense fullback={<LottiHandeler status= 'main' />}><Layout/></Suspense>,
    children : [
      {index: true , element :
                <Suspense fullback={<LottiHandeler status= 'main' />}> <Home/></Suspense> },
      {path: 'home' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Home/></Suspense> },
      {path: 'about' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <About/></Suspense> },
      {path: 'books' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Books/></Suspense> },
      {path: 'shop' , element :
                <Suspense fullback={<LottiHandeler status='page' />}> <Shop/> </Suspense> },     
      {path: 'contact' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Contact/></Suspense>},
      {path: 'cart' , element :
                <Suspense fullback={<LottiHandeler status= 'cart' />}> <Cart/></Suspense> },
       {path: 'wishlist' , element :
                <Suspense fullback={<LottiHandeler status= 'cart' />}> <Wishlist/></Suspense> },
      {path: 'orders' , element :
                <Suspense fullback={<LottiHandeler status= 'cart' />}> <Orders/></Suspense> },
      {path: 'register' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Register/></Suspense> },
      {path: 'login' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Login/></Suspense> },
      {path: 'profile' , element :
                <Suspense fullback={<LottiHandeler status= 'page' />}> <Profile/></Suspense> }
    ],
    errorElement : <LottiHandeler status= 'Err' />
  }
])
    return   <> 
    <RouterProvider router={router}/>
    <Toaster position="top-center" reverseOrder={false} />
    </>
}