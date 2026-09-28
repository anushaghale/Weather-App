import Navbar from "./components/Navbar";
import SearchBox from "./components/Searchbox";
import CurrentWeather from "./components/CurrentWeather";
import StatWeather from "./components/StatCard";
import HourlyWeather from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { useState, useEffect } from "react";
import { convertTemp, convertWind, convertPrecip } from "./utils/convert";
import iconRetry from "./assets/icon-retry.svg";
import iconError from "./assets/icon-error.svg";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tempUnit, setTempUnit] = useState("°C");
  const [windUnit, setWindUnit] = useState("mph");
  const [precipUnit, setPrecipUnit] = useState("mm");
  const [weatherData, setWeatherData] = useState(null);

  const [location, setLocation] = useState(
    {
    name: "Tokyo, Japan",
    latitude: 35.68,
    longitude: 139.77,
  }
);

const [error, setError] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      { cache: "no-store" },
    )
      .then((response) => {
        if(!response.ok)
          throw new Error('Something went wrong');
         return response.json();
        })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
           });
  }, [location , retryCount]);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header>
          <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
            windUnit={windUnit}
            setWindUnit={setWindUnit}
            precipUnit={precipUnit}
            setPrecipUnit={setPrecipUnit}
          />
        </header>
        {error ? (
          <div className="flex flex-col items-center justify-center text-neutral-200 gap-2 mt-20">
            <img src={iconError} alt="Error" className=" w-8 h-8 mb-4"/>
<h1 className="text-4xl font-bold text-white">Something went wrong</h1>


<p className="w-105 max-w-full text-center text-sm text-neutral-300 p-2">
  We couldn't connect to the server (API error). Please try again in a few moments.
  </p>


<button className="flex gap-2 bg-neutral-800 p-2 rounded-[5px] items-center justify-center text-xs"
onClick={() => setRetryCount(retryCount + 1)}
>
  <img src={iconRetry} alt="Retry" className="w-3 h-4" 
  />
  <span>Retry</span>
</button>
</div>
        ) : isLoading ? (
<p className="text-neutral-300 text-sm text-center">Loading...</p>
        ) : (
        <main>
          <SearchBox setLocation={setLocation} />
          <div className="flex items-stretch gap-6 p-8">
            <div className="flex flex-1 flex-col min-w-0 ">
              <CurrentWeather weatherData={weatherData} location={location} />
              <div className="grid grid-cols-4 mt-6 gap-4">
                <StatWeather
                  label="Feels Like"
                  value={
                    weatherData
                      ? `${convertTemp(weatherData.current.apparent_temperature, tempUnit)}`
                      : "--"
                  }
                  unit={tempUnit}
                />
                <StatWeather
                  label="Humidity"
                  value={
                    weatherData
                      ? `${weatherData.current.relative_humidity_2m}%`
                      : "--"
                  }
                />
                <StatWeather
                  label="Wind"
                  value={
                    weatherData
                      ? `${convertWind(weatherData.current.wind_speed_10m, windUnit)}`
                      : "--"
                  }
                  unit={windUnit}
                />
                <StatWeather
                  label="Precipitation"
                  value={
                    weatherData
                      ? `${convertPrecip(weatherData.current.precipitation, precipUnit)}`
                      : "--"
                  }
                  unit={precipUnit}
                />
              </div>

              <DailyForecast weatherData={weatherData} />
            </div>

            <div className="w-80 shrink-0">
              <HourlyWeather weatherData={weatherData} />
            </div>
          </div>
        </main>
         )} 
      </div>
    </div>
  );
  
}

export default App;
