import './auth.css';
import React from 'react';
import { getAuth , GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase';


export default function GoogleLogin(){
  
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const handleGoogleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Login Successful. Welcome ${user.displayName}`);
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  }

    return(
        <button onClick={handleGoogleSignIn} className='block max-md:w-1/2 w-1/4 bg-blue-500 text-white hover:bg-blue-900 cursor-pointer p-2 rounded'>With Google</button>
    )
}
