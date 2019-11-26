import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import clear from "./icons/clear.png";
import drizzle from "./icons/drizzle.png";
import atmosphere from "./icons/atmosphere.png";
import thunderstorm from "./icons/thunderstom.png";
import rain from "./icons/rain.png";
import clouds from "./icons/clouds.png";
import snow from "./icons/snow.png";
import './App.css';
import Weather from "./components/weather";
import Form from "./components/Form";

const API_key ="fc01fe2b6300afba9062da966296e70b"

class App extends React.Component {
  constructor(){
    super();
    this.state= {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      fahrenheit: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description:"",
      error: false
    };

    this.weatherIcon = {
      drizzle: <img src = {drizzle} alt="drizzle"/>,
      rain: <img src = {rain} alt="rain"/>,
      clouds: <img src = {clouds} alt="clouds"/>,
      thunderstorm: <img src= {thunderstorm} alt="thunderstorm"/>,
      snow: <img src= {snow} alt="snow"/>,
      atmosphere: <img src={atmosphere} alt="atmosphere"/>,
      clear: <img src={clear} alt="clear"/>
    }
  }

  calFahrenheit(temp) {
    let fahr = Math.floor(temp -273.15);
    return fahr;
  }

  get_weatherIcon(icon, rangeID){
    switch(true) {
      case rangeID >=200 && rangeID <=232: this.setState({icon:this.weatherIcon.thunderstorm});
      break;
      case rangeID >=300 && rangeID <=321: this.setState({icon:this.weatherIcon.drizzle});
      break;
      case rangeID >=500 && rangeID <=531: this.setState({icon:this.weatherIcon.rain});
      break;
      case rangeID >=600 && rangeID <=622: this.setState({icon:this.weatherIcon.snow});
      break;
      case rangeID >=701 && rangeID <=781: this.setState({icon:this.weatherIcon.atmosphere});
      break;
      case rangeID ===800: this.setState({icon:this.weatherIcon.clear});
      break;
      case rangeID >=801 && rangeID <=804: this.setState({icon:this.weatherIcon.clouds });
      break;
      default: this.setState({icon:this.weatherIcon.clouds})
    }
  }

  getWeather = async(e) =>{

    e.preventDefault();

      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      if(city && country){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
    );

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      fahrenheit: this.calFahrenheit(response.main.temp),
      temp_min: this.calFahrenheit(response.main.temp_min),
      temp_max:this.calFahrenheit(response.main.temp_max),
      description:response.weather[0].description,
    });

    this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
  }else{
    this.setState({error:true})
  }

  };

  render() {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
        city= {this.state.city} 
        country= {this.state.country}
        temp_fahrenheit = {this.state.fahrenheit}
        temp_min= {this.state.temp_min}
        temp_max= {this.state.temp_max}
        description= {this.state.description}
        weatherIcon= {this.state.icon}
      />
    </div>
    );
  }
}

export default App;
