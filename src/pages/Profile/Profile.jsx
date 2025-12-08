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
        
return(
    <div className="Profile mx-auto max-w-2xl p-10">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <div className="space-y-4 rounded bg-white p-6 shadow-lg">
        <div className='flex'>
          <label className="font-semibold text-blue-700">Name:</label>
          <p className="text-black">{currentUser?.fullname || currentUser?.name || '-'}</p>
        </div>
        <div className='flex'>
          <label className="font-semibold text-blue-700">Email:</label>
          <p className="text-black">{currentUser?.email || '-'}</p>
        </div>
        <div className='flex'>
          <label className="font-semibold text-blue-700">Phone:</label>
          <p className="text-black">{currentUser?.phone || '-'}</p>
        </div>
        <div className='flex'>
          <label className='font-semibold text-blue-700'>Country:</label>
          <p className='flex items-center gap-2 font-semibold'>{countryData?.name} { countryData ? ( <img src={countryData?.flags?.png || countryData?.flags?.svg || countryData?.flag} alt={countryData?.name?.common || selected}
        className="h-6 w-8 rounded"/>) : ("")} </p>
        </div>
      </div>
    </div>
)
}

export default Profile;
