
function StatWeather({label,value, unit}){
    return(
        <div className="bg-neutral-800 rounded-[10px] p-2 flex flex-col h-20">
            <p className="text-neutral-300 text-xs ml-2">{label}</p>
            <p className="text-neutral-200 text-2xl ml-2">{value} {unit}</p>
        </div>
    )
}

export default StatWeather;