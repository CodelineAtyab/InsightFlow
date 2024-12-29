fetch("https://www.swapi.tech/api/planets")
     .then((response) => (response.json()))
    .then((json) => json.results)
    .then((results)=> results.forEach(element => {
        console.log(element.name);
    }));