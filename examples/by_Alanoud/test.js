function fetchPlanetNames() {
    fetch("https://www.swapi.tech/api/planets")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const planets = data.results;
            console.log("Planet Names:");
            planets.forEach((planet) => {
                console.log("- " + planet.name);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
fetchPlanetNames();