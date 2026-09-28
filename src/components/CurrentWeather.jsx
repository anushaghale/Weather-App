import bg from "../assets/bg-today-large.svg";
import iconSunny from "../assets/icon-sunny.webp";

function CurrentWeather({ weatherData, location }) {
  const today = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="bg-cover rounded-2xl p-8 h-56 flex justify-between items-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div>
        <p className="text-neutral-0 text-2xl font-bold">{location.name}</p>
        <p className="text-neutral-200">{today}</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={iconSunny} alt="sunny-icon" width={80} height={80} />
        {weatherData && (
          <p className="text-neutral-0 text-6xl font-bold italic">
            {Math.round(weatherData.current.temperature_2m)}°
          </p>
        )}
      </div>
    </div>
  );
}

export default CurrentWeather;
