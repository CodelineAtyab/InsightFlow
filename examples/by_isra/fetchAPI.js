function fetchJSONData() {
    fetch("https://www.swapi.tech/api/planets")
       .then((response) => {
          if (!response.ok) {
                throw new Error
                   (`HTTP error! Status: ${response.status}`);
           }
          return response.json();
        })
       .then((data) =>
           console.log(data))
     .catch((error) =>
           console.error("Unable to fetch data:", error));
 }
fetchJSONData();
