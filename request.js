const key = "65e6b2d4c6831548e14ed166dbe3604c";


const requestCity = async (city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return (data);

}
