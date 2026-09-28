import icon from "../assets/icon-search.svg";
import { useState, useEffect } from "react";

function SearchBox({ setLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSuggestions([]);
      return;
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      });
  }, [searchQuery]);

  const handleSearch = () => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const city = data.results[0];
          setLocation({
            name: `${city.name}, ${city.country}`,
            latitude: city.latitude,
            longitude: city.longitude
          });
          setShowSuggestions(false);
        }
      });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-neutral-0 text-4xl font-bold mb-6">
          How's the sky looking today?
        </h1>
      </div>

      <div className="text-neutral-200 flex flex-row gap-2 items-center justify-center">
        <div className="relative">
          <img
            src={icon}
            alt="search-logo"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-200 w-4 h-4"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="text-neutral-200 bg-neutral-800 rounded-[10px] w-96 pl-10 p-2 placeholder:text-sm"
            placeholder="Search for a place..."
          />
          {showSuggestions && (
            <div className="absolute mt-2 bg-neutral-800 rounded-[10px] text-sm text-neutral-200 w-full z-10">
              {suggestions.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSearchQuery(`${city.name}, ${city.country}`);
                    setShowSuggestions(false);
                    setLocation({
                      name: `${city.name}, ${city.country}`,
                      latitude: city.latitude,
                      longitude: city.longitude,
                    });
                  }}
                  className="block w-full text-left p-2 hover:bg-neutral-600"
                >
                  {city.name}, {city.country}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 rounded-[10px] w-20 p-2"
          onClick={handleSearch}
        >
          <span className="text-sm">Search</span>
        </button>
      </div>
    </>
  );
}

export default SearchBox;
