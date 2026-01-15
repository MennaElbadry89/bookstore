import './Contact.css'
import { MdMyLocation } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

import { useContact } from "../../context/ContactContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactSchema from "./ContactSchema";

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
  
const { sendMessage } = useContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      toast.success("Message sent successfully ✅");
      reset();
    } catch (error) {
      toast.error("Something went wrong ❌");
      console.error(error);
    }
  };




    return(
        <section className="bg-white pt-5">
        <h1 className="mx-20 py-5 text-center text-2xl font-bold text-blue-500 md:py-10 md:text-4xl">Keep in touch </h1>

        <div className="Contact mx-10 mb-2 flex flex-col items-center justify-center gap-5 md:mx-20 md:flex-row">
         
         <form onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3 rounded-lg border border-blue-200 bg-white p-10 shadow-lg md:w-1/2" >
          
          <input
            {...register("name")}
            placeholder="Name"
            className="rounded-lg border border-blue-200 p-2" />
          {errors.name && ( <p className="text-sm text-red-500">{errors.name.message}</p> )}

          <input
            {...register("email")}
            placeholder="Email"
            className="rounded-lg border border-blue-200 p-2" />
          {errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p>  )}

          <input
            {...register("phone")}
            placeholder="Phone (optional)"
            className="rounded-lg border border-blue-200 p-2" />
          {errors.phone && (<p className="text-sm text-red-500">{errors.phone.message}</p>)}

          <textarea
            {...register("message")}
            placeholder="Your message"
            className="rounded-lg border border-blue-200 p-2"/>
          {errors.message && (  <p className="text-sm text-red-500">{errors.message.message}</p>)}

          <button
            disabled={isSubmitting}
            className="w-1/2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-300 disabled:opacity-50">
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
        
        <div className="mx-auto flex w-full flex-col items-center justify-center rounded-2xl border border-blue-200 bg-white shadow-lg md:w-1/2">
                 
          <motion.div className='contac flex flex-col gap-5 bg-white p-5' 
          variants={container}
          initial="hidden"
          animate="show">
             
              <motion.div className='location flex gap-2 rounded-lg border border-blue-200 p-5' variants={item}>
                  <MdMyLocation className="text-lg text-blue-700 md:text-2xl"/>
                  <b className="pl-5 text-gray-500">Egypt - Sharkia - Zagazig</b>
              </motion.div>

              <motion.div className='message flex gap-2 rounded-lg border border-blue-200 p-5' variants={item}>
                  <FaRegMessage className="text-lg text-blue-700 md:text-2xl"/>
                  <b className="pl-5 text-gray-500">mennaelbadry21@gmail.com</b>
              </motion.div>

              <motion.div className='phone flex gap-2 rounded-lg border border-blue-200 p-5' variants={item}>
                  <FaPhoneAlt className="text-lg text-blue-700 md:text-2xl"/>
                  <b className="pl-5 text-gray-500">01060321259</b>
              </motion.div>

              <motion.div className='phone flex items-center justify-center gap-2 rounded-lg border border-blue-200 p-5' variants={item}>
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