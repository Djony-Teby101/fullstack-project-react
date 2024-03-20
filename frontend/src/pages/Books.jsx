import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Books = () => {
    const [livre , setLivre]= useState([])

      useEffect(() => {
        const fetchAllBooks = async () => {
          try {
            const res = await axios.get("http://localhost:8082/api/v1/books");
            setLivre(res.data);
            console.log(res)// verifier si la data est bien recuperée.
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllBooks();
      }, []);

      const handleDelete= async (id)=>{
        try {
          await axios.delete(`http://localhost:8082/api/v1/book/${id}`)
          window.location.reload()
        } catch (error) {
          
        }
      }


    return (
        <div>
            <h1>Livre +</h1>
            <div className="books">
        {livre.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={book.cover} alt="" /> }
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Supprimer</button>
            <button className="update">
              <Link to={`/update/${book.id}`}>modifier</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to='/add' >Aouter un livre</Link>
      </button>
        
      </div>

    );
};

export default Books;
