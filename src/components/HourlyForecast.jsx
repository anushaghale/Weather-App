import iconCloudy from "../assets/icon-overcast.webp";
import iconPartly from "../assets/icon-partly-cloudy.webp";
import iconSunny from "../assets/icon-sunny.webp";
import iconFoggy from "../assets/icon-fog.webp";
import iconSnow from "../assets/icon-snow.webp";
import iconDrizzle from "../assets/icon-drizzle.webp";
import iconRainy from "../assets/icon-rain.webp";
import iconStorm from "../assets/icon-storm.webp";
import { ChevronDown } from "lucide-react";
import { useState,useEffect } from "react";

function HourlyWeather({ weatherData, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const hourlyData = weatherData
    ? weatherData.hourly.time
        .map((time, index) => {
          return {
            time: new Date(time).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            }),
            fulltime: time,
            temperature:
              Math.round(weatherData.hourly.temperature_2m[index]) + "°",
            icon: getIconForCode(weatherData.hourly.weather_code[index]),
          };
        })
        .filter((hour) => 
          hour.fulltime.slice(0,10) === selectedDay
        )
        .slice(0, 8)
    : [];

    useEffect(() => {
if(weatherData){
  setSelectedDay(weatherData.daily.time[0]);
}
    }, [weatherData]);
  function getIconForCode(code) {
    if (code === 0) return iconSunny;
    if (code >= 1 && code <= 3) return iconPartly;
    if (code === 45 || code === 48) return iconFoggy;
    if (code >= 51 && code <= 57) return iconDrizzle;
    if (code >= 61 && code <= 67) return iconRainy;
    if (code >= 71 && code <= 77) return iconSnow;
    if (code >= 80 && code <= 82) return iconCloudy;

    return iconStorm;
  }
  return (
    <div className="flex flex-col text-neutral-200 bg-neutral-800 rounded-2xl p-4 text-sm h-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-neutral-0">Hourly forecast</p>
        <div className="relative">
          <button
            className="bg-neutral-600 text-neutral-0 p-3 text-xs rounded-[10px] flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{isLoading ? "–" : new Date(selectedDay).toLocaleDateString("en-US", {weekday: "long"})}</span>
            <ChevronDown size={15} />
          </button>

          {isOpen && (
            <div className="absolute right-0 bg-neutral-700 rounded-[10px] z-10 w-44">
              <div className="flex flex-col text-neutral-200 p-2 ">
                {weatherData
                  ? weatherData.daily.time.map((day) => {
                      const newDay = new Date(day).toLocaleDateString("en-US", {
                        weekday: "long",
                      });

                      return (
                        <button
                          key={day}
                          className="p-2 hover:bg-neutral-600 rounded-[5px] text-left"
                          onClick={() => {
                            setSelectedDay(day);
                            setIsOpen(false);
                          }}
                        >
                          {newDay}
                        </button>
                      );
                    })
                  : []}
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-600 mb-2 p-2 rounded-[10px] h-12"
            />
          ))
        : hourlyData.map((hour) => (
            <HourCard
              key={hour.time}
              time={hour.time}
              icon={hour.icon}
              temperature={hour.temperature}
            />
          ))}
    </div>
  );
}

function HourCard({ time, icon, temperature }) {
  return (
    <div className="flex flex-row justify-between items-center mt-2.5 bg-neutral-700 rounded-[10px] p-2">
      <div className="flex gap-2 items-center">
        <img src={icon} alt="hourly-icon" className="w-8 h-8" />
        <p>{time}</p>
      </div>
      <p>{temperature}</p>
    </div>
  );
}
export default HourlyWeather;
