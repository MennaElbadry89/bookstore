import React from "react";
import './Contact.css'
import { MdMyLocation } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact(){

  const container = {
    hidden: { opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }
  const item = {
    hidden : { opacity: 0 , y: 100},
    show: { opacity: 1 , y: 0},
  }

    return(
        <section className=" pt-5 bg-white">
        <h1 className="text-blue-500  py-5 mx-20 text-2xl">Keep in touch </h1>

        <div className="Contact  mb-2 flex max-md:flex-col max-md:items-center max-md:justify-center gap-5 mx-20 max-md:mx-10">
            <form className="flex flex-col gap-3 bg-white border border-blue-200 p-10 rounded-lg shadow-lg w-1/2  max-md:w-full max-md:px-10">
                <input type="text" placeholder="Name" className="border border-blue-200 rounded-lg px-3 py-2"/>
                <input type="text" placeholder="E-mail" className="border border-blue-200 rounded-lg px-3 py-2"/>
                <input type="text" placeholder="Subject" className="border border-blue-200 rounded-lg px-3 py-2"/>
                <textarea name="message" id="message" placeholder="Message" className="border border-blue-200 rounded-lg px-3 pt-3 pb-10"></textarea>
                <button className="bg-blue-500 hover:bg-blue-300 text-white cursor-pointer px-3 py-2 border rounded-lg w-1/2">Submit</button>
            </form>

            <div className="w-1/2 max-md:w-full max-md:mx-auto  flex flex-col justify-center items-center bg-white shadow-lg border border-blue-200 rounded-2xl">
                 
                  <motion.div className='contac bg-white p-5 flex flex-col gap-5' 
                  variants={container}
                  initial="hidden"
                  animate="show">
                     
                      <motion.div className='location p-5  rounded-lg border border-blue-200 flex gap-2' variants={item}>
                          <MdMyLocation className="max-md:text-lg text-2xl text-blue-700"/>
                          <b className="pl-5 text-gray-500">Egypt - Sharkia - Zagazig</b>
                      </motion.div>

                      <motion.div className='message p-5  rounded-lg border border-blue-200 flex gap-2 ' variants={item}>
                          <FaRegMessage className="max-md:text-lg text-2xl text-blue-700"/>
                          <b className="pl-5 text-gray-500">mennaelbadry21@gmail.com</b>
                      </motion.div>

                      <motion.div className='phone p-5 rounded-lg border border-blue-200 flex gap-2 ' variants={item}>
                          <FaPhoneAlt className="max-md:text-lg text-2xl text-blue-700"/>
                          <b className="pl-5 text-gray-500">0120011001100</b>
                      </motion.div>

                      <motion.div className='phone p-5 rounded-lg border border-blue-200 flex items-center justify-center gap-2 ' variants={item}>
                          <FaLinkedin className="text-2xl text-blue-700"/>
                          <FaFacebook className="text-2xl text-blue-700"/>
                          <FaGithub className="text-2xl text-blue-700"/>
                          <FaInstagram className="text-2xl text-blue-700"/>             
                      </motion.div>
                  </motion.div>
             </div>
        </div>
  </section>
    )
}