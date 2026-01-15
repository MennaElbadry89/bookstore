import './auth.css'
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod';
import RegisterSchema from './validation/RegisterSchema'
import {useState} from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";

export default function Register(){

    const navigate = useNavigate();
    const { regiserHandler , loading} = useContext(AuthContext);
    const [errfirebase , setErrfirebase] =useState(null);
    
    const { register, handleSubmit, formState: { errors , isValid , isDirty }} = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  console.log(errors);

  const RegisterSubmitHandler = async(data) => {
   const response = await regiserHandler(data);
    if(response.success){
    console.log(data);
         navigate("/profile");
  }else{
    setErrfirebase(response.message);
  }
}


    return(
        <>

        <div className="@container Regiser my-0 bg-white p-5">
            <h1 className="m-5 text-center text-3xl font-semibold text-blue-500 max-md:text-3xl">Register Now </h1>
        <div className="m-auto flex w-1/2 items-center justify-center max-md:w-full"> 
              <form onSubmit={handleSubmit(RegisterSubmitHandler)} className="my-5 flex w-full flex-col justify-center gap-5 rounded-lg border border-blue-300 bg-white p-5 shadow-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="fullname" className= "font-semibold text-gray-900">Full Name</label>
                    <input type="text" {...register( "fullname")}
                     className= {` ${errors.fullname ? "invalid" : ""}w-[90%] rounded-lg border border-blue-300 p-3`}/>
                     { errors.fullname && <p className="text-red-500">{errors.fullname.message}</p> }
                </div>        

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-gray-900">E-mail</label>
                    <input type="text" {...register( "email")} 
                    className= {` ${errors.email ? "invalid" : ""}w-[90%] rounded-lg border border-blue-300 p-3`}/>
                        { errors.email && <p className="text-red-500">{errors.email.message}</p> }
                </div>  
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-semibold text-gray-900">Phone</label>
                    <input type="text" {...register( "phone")} 
                    className= {` ${errors.phone ? "invalid" : ""}w-[90%] rounded-lg border border-blue-300 p-3`}/>
                        { errors.phone && <p className="text-red-500">{errors.phone.message}</p> }
                </div>              
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-gray-900">Password</label>
                    <input type="text" {...register( "password")} 
                    className= {` ${errors.password ? "invalid" : ""}w-[90%] rounded-lg border border-blue-300 p-3`}/>
                        { errors.password && <p className="text-red-500">{errors.password.message}</p> }
                </div> 
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmedpassword" className="font-semibold text-gray-900">Confirm-password</label>
                    <input type="text" {...register( "confirmedpassword")} 
                     className= {` ${errors.confirmedpassword ? "invalid" : ""}w-[90%] rounded-lg border border-blue-300 p-3`}/>
                        { errors.confirmedpassword && <p className="text-red-500">{errors.confirmedpassword.message}</p> }
                </div>
                { errfirebase && <p className="alert text-red-500">{errfirebase}</p> }
               <button disabled={ !isDirty || !isValid || loading}
               className="authbtn w-1/2 cursor-pointer rounded-lg border-none bg-blue-500 p-3 text-white hover:bg-blue-400">
                { loading ? <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                : "Submit" }
               </button> 
            </form>
        </div>
    </div>
           


        </>
    )
}