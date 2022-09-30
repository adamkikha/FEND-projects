/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = ",us&appid=29777e09d4e87aadf71931e254dd43dc&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
const feeling = document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+"."+ d.getDate()+"."+ d.getFullYear();

// GET function to fetch api data
const getData = async (baseUrl,zip,apiKey) =>{
    const request = await fetch(baseUrl+zip+apiKey);
    try {
        // Transform into JSON
        const data = await request.json();
        return data;
    }
    catch(error){
        // appropriately handle the error
        console.log("error", error);
    }
}

// POST function to post data to the app
const postData = async (url,data) =>{
    const response = await fetch(url, {
        method: "POST", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
    }catch(error) {
      console.log("error", error);
    }
}

// Function to update Ui dynamically
const updateUi = async () =>{
    const request = await fetch("/get");
    try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = 
    Math.round(allData[newDate].temp)+ " degrees";
    document.getElementById("content").innerHTML = allData[newDate].feel;
    document.getElementById("date").innerHTML = allData[newDate].date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

// Adding listener to make the appropriate http requests
document.getElementById("generate").addEventListener("click",() =>{
    getData(baseUrl,document.getElementById("zip").value,apiKey).then((d) =>{
        postData("/post",{
            date: newDate,
            temp: d.main.temp,
            feel: feeling.value
        });
    }).then(updateUi);
});