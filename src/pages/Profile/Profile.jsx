import LottiHandeler from '../../assets/lottifiles/LottiHandeler.jsx';
import { AuthContext } from '../../context/AuthContext'
import  './Profile.css'
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { CountryContext } from '../../context/CountryContext'

function Profile(){

      const {country ,selected , setSelected } = useContext(CountryContext);
      let countryData = null;
  if (selected) {
    // Footer Options sets selected to the whole country object (with name, flag).
    if (typeof selected === 'object') {
      countryData = selected;
    } else if (Array.isArray(country)) {
      // Support several country data shapes: { name: 'X' } or { name: { common: 'X' }, cca2, cca3, flags }
      countryData = country.find(c =>
        (typeof c?.name === 'string' && c.name === selected) ||
        c?.name?.common === selected ||
        c?.cca2 === selected ||
        c?.cca3 === selected
      );
    }
  }

     const {loadingDisplayCurrentUser, currentUser} = useContext(AuthContext)
        if( loadingDisplayCurrentUser){
            return <LottiHandeler  status={'main'} />
        }
        else if( !loadingDisplayCurrentUser && ! currentUser){
            return <Navigate to={'/login'}/>
        }
        else{
return(
  <div className="Profile m-20 max-md:m-10">
    <h1 className='text-2xl my-10 text-center font-semibold text-blue-600'>Your Profile data</h1>
    <div className='flex flex-col gap-5'>
      <p className='font-semibold'>Name: <span className='text-blue-600 '>{currentUser?.fullname}</span></p>
      <p className='font-semibold'>E-mail: <span className='text-blue-600 '>{currentUser?.email}</span></p>
      <p className='font-semibold'>Phone: <span className='text-blue-600 '>{currentUser?.phone}</span></p>
      <p className='font-semibold  flex items-center gap-2'>Country : {countryData?.name} { countryData ? ( <img src={countryData?.flags?.png || countryData?.flags?.svg || countryData?.flag} alt={countryData?.name?.common || selected}
        className="w-8 h-6 rounded "/>) : ("")} </p>

    </div>
  </div>
)
}
}
export default Profile;
