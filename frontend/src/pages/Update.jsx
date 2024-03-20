
import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
  const [livres, setLivres]=useState({
    title:"",
    description:"",
    cover:"",
  });

 const navigate= useNavigate()
 const location= useLocation()
 const bookId=location.pathname.split("/")[2]

 console.log(bookId)


  const handleChange=(e)=>{
    setLivres((prev)=> ({...prev, [e.target.name]: e.target.value}));
  }
   

  const handleClick= async e =>{
    e.preventDefault()
    try {
      await axios.put("http://localhost:8082/api/v1/book/"+bookId, livres);
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(livres)
  return (
    <div className='form'>
    <h1>Modifier un Livre</h1>
    <input type="text" placeholder='title'onChange={handleChange} name='title' />
    <input type="text" placeholder='desc' onChange={handleChange} name='description'/>
    <input type="text" placeholder='cover'name='cover' onChange={handleChange} />

    <button className='formButton' onClick={handleClick}>Modifier</button>
  </div>
  )
}

export default Update