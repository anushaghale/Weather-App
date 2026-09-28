import Navbar from "./components/Navbar";
import SearchBox from "./components/Searchbox";
import CurrentWeather from "./components/CurrentWeather";
import StatWeather from "./components/StatCard";
import HourlyWeather from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { useState, useEffect } from "react";
import { convertTemp, convertWind, convertPrecip } from "./utils/convert";

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

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      { cache: "no-store" },
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, [location]);

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
      </div>
    </div>
  );
}

export default App;
