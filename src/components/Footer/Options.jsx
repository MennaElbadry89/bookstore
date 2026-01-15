import { useContext , useState } from "react";
import { CountryContext } from '../../context/CountryContext'
import {AuthContext} from "../../context/AuthContext";

export default function Options(){
    
    const {country , selected , setSelected} = useContext(CountryContext);
    const { currentUser } = useContext(AuthContext);
    console.log("currentuser:", currentUser);

    const[search , setSearch] = useState("")
    const[showList , setShowList] = useState(false) 
    
    
    const filtered = country.filter((country) => country.name.toLowerCase().includes(search.toLocaleLowerCase()))

    const handleSelect = (country) =>{
        setSelected(country)
        setSearch("")
        setShowList(false)
    }

 return (
    <section className="@container mx-auto px-4">
        <label htmlFor="country" className="block text-center text-2xl text-blue-700 max-md:text-lg">
             <b>Select your country</b>
        </label>
        <div className="relative mx-auto mt-4 w-full">
            <input type="text" placeholder="select ur country" name="country"
                className="w-full rounded-lg border border-blue-700 p-2" value={search}
                onChange={(e)=>{ setSearch(e.target.value); setShowList(true) }} />

            { showList && filtered.length > 0 && (
                <ul>
                    {filtered.length > 0 ? ( filtered.map((country)=>(<li key={country.name} onClick={()=> handleSelect(country)}
                     className="flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2 hover:bg-gray-200">
                        <img src={country.flag} alt={country.name} className="h-8 w-10"/>
                        <span className="font-semibold">{country.name}</span> </li> ))) 
                        : (<li className="text-blue-500" ></li>)}
                </ul>
            )}
            { currentUser ?
                selected && (<div className="mt-2 flex items-center gap-2 text-blue-500">
                        <img src={selected.flag} alt={selected.name} className="h-6 w-6"/>
                        <span className="font-normal">{selected.name}</span>
                    </div>) : ""  }
        </div>
    </section> 
 )
 
}