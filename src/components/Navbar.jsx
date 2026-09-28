import { Settings, ChevronDown, Check } from "lucide-react";
import logo from "../assets/logo.svg";

function UnitOption({ label, isSelected, onSelect, showBorder }) {
  return (
    <button
      className={`p-2 hover:bg-neutral-600 rounded-[5px] text-start flex justify-between ${
        showBorder ? "border-b border-neutral-600 pt-2" : ""
      }`}
      onClick={onSelect}
    >
      <span>{label}</span>
      {isSelected && <Check className="ml-2" size={16} />}
    </button>
  );
}

function Navbar({
  isOpen,
  setIsOpen,
  tempUnit,
  setTempUnit,
  windUnit,
  setWindUnit,
  precipUnit,
  setPrecipUnit,
}) {
  return (
    <div className="flex justify-between p-8 items-center ">
      <img src={logo} alt="Weather Now logo" className="w-44 h-14" />

      <div className="relative">
        <button
          className="bg-neutral-800 gap-2 rounded-[10px] outline-none ring-offset-neutral-800 transition-all duration-100 ease-out focus:outline-none focus:ring-2 focus:ring-white w-28 p-3 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings className="text-neutral-200" size={20} />
          <span className="text-neutral-200 text-sm font-medium">Units</span>
          <ChevronDown className="text-neutral-200" size={20} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bg-neutral-700 rounded-[10px] z-10 w-40 text-xs mt-2">
            <div className="flex flex-col text-neutral-200 p-2">
              <p className="m-2">Switch to imperial</p>

              <p className="text-neutral-300 m-2">Temperature</p>
              <UnitOption
                label="Celsius (°C)"
                isSelected={tempUnit === "°C"}
                onSelect={() => setTempUnit("°C")}
              />
              <UnitOption
                label="Fahrenheit (°F)"
                isSelected={tempUnit === "°F"}
                onSelect={() => setTempUnit("°F")}
                showBorder
              />

              <p className="text-neutral-300 m-2">Wind Speed</p>
              <UnitOption
                label="km/h"
                isSelected={windUnit === "km/h"}
                onSelect={() => setWindUnit("km/h")}
              />
              <UnitOption
                label="mph"
                isSelected={windUnit === "mph"}
                onSelect={() => setWindUnit("mph")}
                showBorder
              />

              <p className="text-neutral-300 m-2">Precipitation</p>
              <UnitOption
                label="Millimeters (mm)"
                isSelected={precipUnit === "mm"}
                onSelect={() => setPrecipUnit("mm")}
              />
              <UnitOption
                label="Inches (in)"
                isSelected={precipUnit === "in"}
                onSelect={() => setPrecipUnit("in")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
