import bgLarge from "../assets/bg-today-large.svg";
import bgSmall from "../assets/bg-today-small.svg"; 
import iconSunny from "../assets/icon-sunny.webp";

function CurrentWeather({ weatherData, location, isLoading }) {
  const today = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isLoading) {
    return (
      <div className="bg-neutral-800 rounded-2xl p-8 h-56 flex flex-col justify-center items-center text-neutral-200">
        <div className="flex gap-2 mb-2">
          <span className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce" />
          <span
            className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-neutral-200 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div
      className="bg-cover rounded-2xl p-8 h-56 flex justify-between items-center bg-(image:--bg-small) md:bg-(image:--bg-large)"
      style={{
         "--bg-small": `url(${bgSmall})`,
    "--bg-large": `url(${bgLarge})`,
       }}
    >
      <div>
        <p className="text-neutral-0 text-2xl font-bold">{location.name}</p>
        <p className="text-neutral-200">{today}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
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
