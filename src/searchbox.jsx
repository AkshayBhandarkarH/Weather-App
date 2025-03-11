import { React, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Gmap from "./Map";
function Searchbox() {
  let [city, setCity] = useState("Bangalore");
  let [weatherData, setWeatherData] = useState([]);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_Key = "e68085b833faab6a5a00fd4e1d3fef30";

  useEffect(() => {
    getWeatherInfo();
  }, []);
  let getWeatherInfo = async () => {
    let response = await fetch(`${API_URL}?q=${city ? city : "Bangalore"}&appid=${API_Key}&units=metric`);
    let data = await response.json();
    console.log(data);
    let result = {
      temparature: data.main.temp,
      MaxTemp: data.main.temp_max,
      MinTemp: data.main.temp_min,
      lat: data.coord.lat,
      lon: data.coord.lon,
      hum: data.main.humidity,
    };
    console.log(result);
    setWeatherData(result);
  };

  let handleChange = (evt) => {
    evt.preventDefault();
    setCity(evt.target.value);
  };

  let handleSubmit = (evt) => {
    evt.preventDefault();
    getWeatherInfo(city);
  };
  const [address, setAddress] = useState("");

  function handleSearch(evt) {
    setCity("");
    setAddress(evt);
    setCity(address);
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <div>
      <div className="searchbox">
        <h3 className="py-4">Weather App</h3>
        <div className="d-flex justify-content-center align-items-center ">
          <div>
            <form onSubmit={handleSubmit} className="bg-success p-2 rounded">
              <TextField
                id="city"
                value={city}
                label="Add locations"
                className="input pe-3 text-dark  "
                onChange={handleChange}
                sx={{
                  input: {
                    color: "white",
                  },
                }}
              />
              <Button type="submit" className="text-light bg-dark mt-2 ">
                Search
              </Button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
      <div className="container">
        <div className="map">
          <Gmap lat={weatherData.lat} lng={weatherData.lon}></Gmap>
        </div>
        <div className="weatherData">
          {weatherData && (
            <div className="WeatherInfo d-flex">
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">Temparature</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">{weatherData.temparature} °C</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">Max temp</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">{weatherData.MaxTemp} °C</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">Min temp</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">{weatherData.MinTemp} °C</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">Humidity</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className="text-dark border rounded border-secondary ">{weatherData.hum} %</Item>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbox;
