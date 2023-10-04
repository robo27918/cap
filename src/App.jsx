import { useState } from 'react'
const  ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY
import './App.css'
import APIForm from './components/APIForm';

function App() {
  const[inputs,setInputs] = useState(
    {
      url:"",
      format:"",
      no_ads: "",
      no_cookie_banners:"",
      width:"",
      height:"",
    }
  );
  const submitForm = () =>{
    //code goes here
  }
  return (
    <div className='whole-page'>
      <h1>Build Your Own Screenshot! 📸</h1>

      <APIForm
        inputs ={inputs}
        handleChange {(e)=>
          setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]:e.targate.value.trim(),
          }))
        }
        onSubmit={submitForm}

      />

      <br></br>
    </div>
  )
}

export default App
