const apiKey = "68d999720eb8ddc134aa571b0469c28a";

document.getElementById("search-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const city = document.getElementById("search-bar-input").value;

    if (!city) {
        alert("Inserisci il nome di una città");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) alert("Città non trovata");
            return response.json();
        })
        .then(data => {
            document.getElementById("temperature-container").innerHTML = `<p>${Math.round(data.main.temp)}&deg;C</p>`;
            document.getElementById("location-container").innerHTML = `<p>${data.name}</p>`;
            document.querySelector("#humidity-container p.fs-3").innerText = `${data.main.humidity}%`;
            document.querySelector("#wind-container p.fs-3").innerText = `${data.wind.speed} km/h`;

            const weatherCondition = data.weather[0].main;
            document.querySelectorAll(".weather-icon").forEach(icon => icon.classList.add("d-none"));

            if (weatherCondition === "Clear") document.getElementById("sun-icon").classList.remove("d-none");
            else if (weatherCondition === "Clouds") document.getElementById("clouds-icon").classList.remove("d-none");
            else if (weatherCondition === "Rain") document.getElementById("rain-icon").classList.remove("d-none");
            else if (weatherCondition === "Snow") document.getElementById("snow-icon").classList.remove("d-none");
            else if (weatherCondition === "Thunderstorm") document.getElementById("bolt-icon").classList.remove("d-none");

            document.getElementById("temperature-container").classList.remove("d-none");
            document.getElementById("location-container").classList.remove("d-none");
            document.getElementById("humidity-container").classList.remove("d-none");
            document.getElementById("wind-container").classList.remove("d-none");
        })
});
