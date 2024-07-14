import React from 'react';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import { useState } from 'react'; 


export default function App(){

  const [category,setCategory] = useState("general");

  return(
    <div>
      <Navbar setCategory={setCategory}/>
      <NewsBoard category={category}/>
    </div>
  )
}