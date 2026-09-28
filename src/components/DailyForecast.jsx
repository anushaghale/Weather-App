import iconRainy from "../assets/icon-rain.webp";
import iconDrizzle from "../assets/icon-drizzle.webp";
import iconSunny from "../assets/icon-sunny.webp";
import iconPartly from "../assets/icon-partly-cloudy.webp";
import iconStorm from "../assets/icon-storm.webp";
import iconSnow from "../assets/icon-snow.webp";
import iconFoggy from "../assets/icon-fog.webp";
import iconCloudy from "../assets/icon-partly-cloudy.webp";

function DailyForecast({weatherData, isLoading}) {
  const dailyData = weatherData ? weatherData.daily.time.slice(0,7).map((day, index) => {
  return{
    day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
    temp1: Math.round(weatherData.daily.temperature_2m_max[index]) + "°",
    temp2: Math.round(weatherData.daily.temperature_2m_min[index]) + "°",
    icon: getIconForCode(weatherData.daily.weather_code[index])
  }
}) : [];

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
    <div className="mt-7">
      <h1 className="text-neutral-200">Daily forecast</h1>
      <div className="grid grid-cols-7 gap-2">
          {isLoading
    ? Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="bg-neutral-800 rounded-[10px] h-[139.99px] mt-4" />
      ))
    :
        dailyData.map((day) => {
          return (
            <DailyCard
              key={day.day}
              day={day.day}
              icon={day.icon}
              temp1={day.temp1}
              temp2={day.temp2}
            />
          );
        })}
      </div>
    </div>
  );
}


function DailyCard({ day, icon, temp1, temp2 }) {
  return (
    <div className="flex flex-col text-neutral-200 bg-neutral-800 rounded-[10px] items-center p-4 text-sm gap-4 mt-4">
      <p>{day}</p>
      <img src={icon} alt="rainy-icon" className="w-9 h-10" />
      <div className="flex items-center justify-between text-xs w-full">
        <p>{temp1}</p>
        <p>{temp2}</p>
      </div>
    </div>
  );
}

export default DailyForecast;
