import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Books from './pages/Books'
import Ajout from './pages/Ajout'
import Update from './pages/Update'

function App() {
 
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route  path='/add'  element={<Ajout />}/>
          <Route  path='/update/:id'  element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App