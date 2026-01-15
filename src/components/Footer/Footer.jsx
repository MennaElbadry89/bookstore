
import visa from '../../../public/images/eg.webp' ;
import './Footer.css'
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
// import axios from 'axios';
import Options from './Options';


function Footer (){


    return(
         <div className='Footer static bottom-0 left-0 z-50 flex w-full flex-col bg-blue-50'>
            <div className="top mx-auto w-full">
  
                <div className="row mx-20 my-10 grid grid-cols-1 gap-5 max-md:mx-10 md:grid-cols-2 lg:grid-cols-3">

                  <div className="Login">
                          {/* <b className="text-amber-500">Choose your country</b> */}
                         <Options />
                       </div> 

                    <div className="media flex flex-col items-center justify-center gap-2">
                                    <b className='text-2xl text-blue-700 max-md:text-lg'>Store Media </b>
                                    <ul className='max flex pt-5 text-4xl'>
                                        <li className='w-15 h-15 cursor-pointer rounded text-blue-400 hover:text-blue-600'><TiSocialFacebook /></li>
                                        <li className='w-15 h-15 cursor-pointer rounded text-blue-400 hover:text-blue-600'><FaTwitter /></li>
                                        <li className='w-15 h-15 cursor-pointer rounded text-blue-400 hover:text-blue-600'><FaInstagram /></li>
                                        <li className='w-15 h-15 cursor-pointer rounded text-blue-400 hover:text-blue-600'><FaLinkedin /></li>
                                        <li className='w-15 h-15 cursor-pointer rounded text-blue-400 hover:text-blue-600'><FaGithub /></li>
                                    </ul>
                                  </div>       

                    <div className="NEWSLETTER flex flex-col items-center justify-center gap-2">
                            <b className='text-2xl text-blue-700 max-md:text-lg'>NEWSLETTER</b>
                            <p>Get latest offers directly to ur inbox.</p>
                            <div className='mail flex border border-blue-400'>
                                <input type="e-mail" placeholder='  Enter your e-mail' />
                                <button className='cursor-pointer bg-blue-400 px-5 py-2 text-white'>Submit</button>
                            </div>
                          </div>        
          </div>
         </div>
            
            <div className="bottom w-full border-t border-white">
                  <div className="">
                    <div className="bottom mx-5 my-5 flex items-center justify-around gap-5 max-md:flex-col">
                    <p className=''>All rights reserved@ <a className='font-bold text-blue-700' href="https://www.linkedin.com/in/menna-elbadry21/">Menna Elbadry</a> </p>
                   <div className='w-1/4 max-md:w-1/2'>
                    <img src={visa}  className="w-full" alt="" />
                    </div> 
                    </div>
                  </div>
            </div>
        </div>

    )
}

export default Footer