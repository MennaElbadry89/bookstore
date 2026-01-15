import React from "react";
import './Contact.css'

import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";




export default function ContactLinks(){


    return(
        <section className="@container fixed right-8 top-1/2 z-50 bg-gray-200 pt-5">
        <div className="ContactLinks mb-2 flex flex-col items-center justify-center gap-5">
            <a href="https://wa.me/+201002020020" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-green-500 p-2 text-white transition hover:bg-green-600">
                <IoLogoWhatsapp size={24} />
            </a>
            <a href="https://m.me/yourpage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700">
                <FaFacebookMessenger size={24} />
            </a>
            <a href="tel:+201002020020" className="flex items-center gap-2 rounded-full bg-gray-800 p-2 text-white transition hover:bg-gray-900">
                <FaPhoneSquareAlt size={24} />
            </a>
        </div>

        </section>
    )
}