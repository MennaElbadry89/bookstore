
import visa from '../../../public/images/eg.webp' ;
import './Footer.css'
import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import Options from './Options';


function Footer (){


    return(
         <div className='Footer flex flex-col w-full static bottom-0 left-0 bg-blue-50 z-[200]'>
            <div className="top w-full mx-auto">
  
                <div className="row max-md:mx-10 mx-20 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                  <div className="Login ">
                          {/* <b className="text-amber-500">Choose your country</b> */}
                         <Options />
                       </div> 

                    <div className="media flex flex-col items-center justify-center gap-2">
                                    <b className='text-blue-700 max-md:text-lg text-2xl'>Store Media </b>
                                    <ul className='flex max text-4xl pt-5'>
                                        <li className='w-15 h-15 rounded text-blue-400 hover:text-blue-600 cursor-pointer'><TiSocialFacebook /></li>
                                        <li className='w-15 h-15 rounded text-blue-400 hover:text-blue-600 cursor-pointer'><FaTwitter /></li>
                                        <li className='w-15 h-15 rounded text-blue-400 hover:text-blue-600 cursor-pointer'><FaInstagram /></li>
                                        <li className='w-15 h-15 rounded text-blue-400 hover:text-blue-600 cursor-pointer'><FaLinkedin /></li>
                                        <li className='w-15 h-15 rounded text-blue-400 hover:text-blue-600 cursor-pointer'><FaGithub /></li>
                                    </ul>
                                  </div>       

                    <div className="NEWSLETTER flex flex-col items-center justify-center gap-2">
                            <b className='text-blue-700 max-md:text-lg text-2xl'>NEWSLETTER</b>
                            <p>Get latest books and offers directly to ur inbox.</p>
                            <div className='mail flex border border-blue-400'>
                                <input type="e-mail" placeholder='  Enter your e-mail' />
                                <button className='bg-blue-400 text-white py-2 px-5 cursor-pointer'>Submit</button>
                            </div>
                          </div>        
          </div>
         </div>
            
            <div className="bottom w-full border-t border-white">
                  <div className="">
                    <div className="bottom max-md:flex-col my-5 mx-5 flex items-center justify-around gap-5">
                    <p className=''>All rights reserved@ <a className='text-blue-700 font-bold' href="https://www.linkedin.com/in/menna-elbadry21/">Menna Elbadry</a> </p>
                   <div className='max-md:w-1/2 w-1/4'>
                    <img src={visa}  className="w-full" alt="" />
                    </div> 
                    </div>
                  </div>
            </div>
        </div>

    )
}

export default Footer