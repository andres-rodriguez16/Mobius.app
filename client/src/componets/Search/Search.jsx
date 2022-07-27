import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideoGamePorSearch } from "../../redux/actions/action";

const Search = ({setActualPage}) =>{
 const [name, setName] = useState("");
 const dispacth = useDispatch();

 function handleInputChange(e){
   e.preventDefault();
   setName(e.target.value)
 }
function handleSubmit(e){
  e.preventDefault();
  dispacth(getVideoGamePorSearch(name))
  setActualPage(1)
}

  return (
     <div>
       <h2>Buscador</h2>
       <div>
            <label className="label" htmlFor="title">
            </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              placeholder="buscar..."
              onChange={(e) => handleInputChange(e)}
            />
             <button type="submit" onClick={(e) => handleSubmit(e)}>BUSCAR</button>
          </div>
      </div>
  )
}

export default Search;