
fetch('https://www.swapi.tech/api/planets')
    .then(response => {
        return response.json();
    })
    .then(data => {

        const results = data.results;
        results.forEach(planet => {
            console.log(planet.name);
        });
    })
