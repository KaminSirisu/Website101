const mykey = "44dedb3f4da76d6c6d036d9f8c49488c"

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (cityname) =>
`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${mykey}`;
    
async function getWeatherByCityname(cityname) {
    const resp = await fetch(url(cityname), {
    origin: "cors"});
    const respData = await resp.json();

    addWeatherToPage(respData);
    console.log(respData)
    
};


function addWeatherToPage(data){
    const temp = KtoC(data.main.temp);
    const humid = data.main.humidity;
    const win = data.weather[0].description;

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h1>Temperature:</h1>
        <h2>${temp}°C</h2>
        <h1>Humidity:</h1>
        <h2>${humid}%</h2>
        <h1>Description:</h1>
        <h2>${win}</h2>
    `;

    //cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}
function KtoC(K){
    return (K - 273.15).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByCityname(city);
    }
});

