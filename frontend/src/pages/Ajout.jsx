import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Ajout() {
  const [livres, setLivres]=useState({
    title:"",
    description:"",
    cover:"",
  });

 const navigate= useNavigate()

  const handleChange=(e)=>{
    setLivres((prev)=> ({...prev, [e.target.name]: e.target.value}));
  }
   

  const handleClick= async e =>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8082/api/v1/books", livres);
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(livres)
  return (
    <div className='form'>
      <h1>Ajouter un Livre</h1>
      <input type="text" placeholder='title'onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='description'/>
      <input type="text" placeholder='cover'name='cover' onChange={handleChange} />

      <button className='formButton' onClick={handleClick}>Ajouter</button>
    </div>
  )
}

export default Ajout