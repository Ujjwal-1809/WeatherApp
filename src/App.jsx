import { useState, useEffect } from 'react'
import './App.css'
import Clear from "./assets/sunny.png"
import Clouds from "./assets/cloudy.png"
import Rain from "./assets/rainy.png"
import Snow from "./assets/snowy.png"

function App() {
  const [location, setLocation] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("New Delhi");
  const [weatherType, setWeatherType] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [weatherImg, setWeatherImg] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {

    const currentWeather = async () => {
      const currentLocation = "New Delhi"
      const apiKey = 'e8305f702c30f8d6161f533b8706b2c5'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=${apiKey}`
      const res = await fetch(url)
      const jsonRes = await res.json()

      setWeatherType(jsonRes.weather[0].main)
      setTemp(Math.floor((jsonRes.main.temp)))
      setHumidity(jsonRes.main.humidity)
      setWind(jsonRes.wind.speed)

      const weatherImages = {
        Clear: Clear,
        Clouds: Clouds,
        Snow: Snow,
        Rain: Rain,
        Fog: Snow,
        Smoke: Clouds,
        Haze: Clouds,
        Mist: Clouds

      };

      if (weatherImages.hasOwnProperty(jsonRes.weather[0].main)) {
        setWeatherImg(weatherImages[jsonRes.weather[0].main])

      }
      else {
        setWeatherImg(weatherImg)
      }

    }
    currentWeather()


  }, [])

  const checkWeather = async () => {
    const apiKey = 'e8305f702c30f8d6161f533b8706b2c5'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    const res = await fetch(url)
    const jsonRes = await res.json()
    console.log(jsonRes);

    if (jsonRes.cod === 200) {
      setWeatherType(jsonRes.weather[0].main)
      setTemp(Math.floor((jsonRes.main.temp)))
      setHumidity(jsonRes.main.humidity)
      setWind(jsonRes.wind.speed)
      setDisplayedLocation(location)


      const weatherImages = {
        Clear: Clear,
        Clouds: Clouds,
        Snow: Snow,
        Rain: Rain,
        Fog: Snow,
        Smoke: Clouds,
        Haze: Clouds,
        Mist: Clouds
      };

      if (weatherImages.hasOwnProperty(jsonRes.weather[0].main)) {
        setWeatherImg(weatherImages[jsonRes.weather[0].main])

      }

      else {
        setWeatherImg(weatherImg)
      }

    }
    else {
      setIsNotFound(true);
      setWeatherImg("");
      setTimeout(() => {
        setIsNotFound(false)
        setWeatherImg(weatherImg)
      }, 1000);
    }
  }

  const date = new Date();
  let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let formattedDate = `${week[date.getDay()] + "," + date.getDate() + " " + months[date.getMonth()]}`

  const bgColors = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Fog: 'linear-gradient(to right, azure, skyblue)',
    Smoke: 'linear-gradient(to right, azure, skyblue)'
  }

  const backgroundImage = bgColors[weatherType] || 'linear-gradient(to right, azure, skyblue)';

  const appStyle = {
    backgroundImage: bgColors[weatherType] || 'linear-gradient(to top, azure, skyblue)',
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && location.trim() !== "") {
      checkWeather()
    }
  };

    if (isNotFound){
      return <div id='error' className='h-screen w-[100%] flex justify-center items-center text-5xl bg-sky-200' >Not Found &#10060;</div>
    }
     else{
      return ( 
      <>
         <div style={{ backgroundImage }} id='container' className='h-screen w-[100%] flex justify-center items-center flex-col'>

    <div style={appStyle} id='mainApp' className='cursor-pointer w-[250px] h-[500px] rounded-xl flex gap-y-2 flex-col justify-center items-center gap-x-1' >

        <div id='location' className=''><i className="fa-solid fa-location-dot"></i><span className='text-3xl ml-2'>{displayedLocation}</span></div>
        <div id='inputField' className='relative w-[200px]'>
          <input onKeyDown={handleKeyPress} value={location} spellCheck={false} onChange={(e) => setLocation(e.target.value)} className='bg-transparent pt-1 outline-none text-2xl pl-2 rounded-3xl w-[200px] h-[35px]' type='text' placeholder='Enter location' />
          <button disabled={location.trim() === ""} onClick={checkWeather} className='w-8 absolute mt-[2px] right-0 h-[30px] pt-[5px] mr-[1px] rounded-3xl'><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div id='empty' className='h-28 w-[100%]'></div>
        <div id='weatherType' className='text-2xl font-bold tracking-widest mt-4'>{weatherType}</div>
        <div id='temp' className='text-6xl font-extrabold'>{temp}°C</div>
        <div id='date' className='text-xl font-bold justify-self-start'>{formattedDate}</div>

        <div id='humidity_and_wind' className='flex text-center text-2xl gap-x-2'>
          <div id='humidity' className='rounded-xl bg-slate bg-opacity-20" h-24 w-28'>Humidity<br /><i className="fa-solid fa-droplet"></i><br />{humidity}%</div>
          <div id='wind' className='rounded-xl bg-slate bg-opacity-20" h-24 w-28'>Wind<br /><i className="fa-solid fa-wind"></i><br />{wind} km/hr</div>
        </div>  
    
  </div> 

    <img
      className='mt-[-29rem] w-[70%]'
      src={weatherImg}
    />

  </div>
  </>)}
}

export default App



