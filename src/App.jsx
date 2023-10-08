import { useState } from 'react';
const  ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css'
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';
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

  const [currentScreenShot, setCurrentScreenShot] = useState(null)
  const [prevImages, setPrevImages] = useState([]);
  const submitForm = () =>{
    //default values for case where user doesn't
    //input values
    console.log("call to submitForm()");
    let defaultValues ={
      format:"jpeg",
      no_ads:"true",
      no_cookie_banners:"true",
      width:"1920",
      height:"1080",
    };

    if (inputs.url ==="" || inputs.url===" "){
      alert("You forgot to submit an url!");
    }
    else{
      for(const [key,value] of Object.entries(inputs)){
        if(value == ""){
          inputs[key] = defaultValues[key]
        }
      }
    }
    makeQuery();
  }



const makeQuery = () => {
  console.log("printing access key", ACCESS_KEY)
  let wait_until = "network_idle";
  let response_type = "json";
  let fail_on_status = "400%2C404%2C500-511";
  let url_starter = "https://";
  let fullURL = url_starter + inputs.url;
  let query = `https://api.apiflash.com/v1/urltoimage?access_key=${"72dc8b9c51c142038214a25f08435341"}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
  console.log("calling makeQuery()","\n",query);
  callAPI(query).catch(console.error);
}

const callAPI = async (query) =>{
  const response = await fetch(query);
  const json = await response.json();
  console.log("printing json from callAPI", json)
  console.log("callAPI being called....")
  console.log(json);

  if (json.url == null){
    alert("could not handle this request.")
  }
  else{
    setCurrentScreenShot(json.url);
    setPrevImages((images)=>[...images,json.url]);
    reset();
  }
  console.log("end of callAPI");
}
const reset = () =>{
    setInputs(
      {
        url:"",
        format:"",
        no_ads: "",
        no_cookie_banners:"",
        width:"",
        height:"",
      }
    );
}
  return (
    <div className='whole-page'>
      <h1>Build Your Own Screenshot! 📸</h1>

      <APIForm
        inputs ={inputs}
        handleChange ={(e)=>
          setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}

      />

      <br></br>
      {currentScreenShot ? (
        <img
          className ="screenshot"
          src={currentScreenShot}
          alt="Screenshot returned"
        />):
        (
          <div>FUCKKKKKKK</div>
        )}

       <div className="container">
          <h3>Current Query Status:</h3>
          <p>
            <br></br>
            &url={inputs.url} <br></br>
            &format={inputs.format} <br></br>
            &width={inputs.width}
            <br></br>
            &height={inputs.height}
            <br></br>
            &no_cookie_banners={inputs.no_cookie_banners}
            <br></br>
            &no_ads={inputs.no_ads}
            <br></br>
          </p>
       </div>

       <div className="container">
          <Gallery images={prevImages}/>
       </div>

      
    </div>
  )
}

export default App
