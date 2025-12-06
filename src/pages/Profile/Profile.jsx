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
    <div className="Profile p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white shadow-lg rounded p-6 space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Name:</label>
          <p className="text-gray-600">{userData?.fullname || userData?.name || '-'}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-700">Email:</label>
          <p className="text-gray-600">{userData?.email || '-'}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-700">Phone:</label>
          <p className="text-gray-600">{userData?.phone || '-'}</p>
        </div>
        <div>
          <label className='font-semibold text-gray-700'>Country:</label>
          <p className='font-semibold  flex items-center gap-2'>{countryData?.name} { countryData ? ( <img src={countryData?.flags?.png || countryData?.flags?.svg || countryData?.flag} alt={countryData?.name?.common || selected}
        className="w-8 h-6 rounded "/>) : ("")} </p>
        </div>
      </div>
    </div>
)
}

export default Profile;
