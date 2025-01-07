const wentWellContainer = document.getElementById("went-well");
const challengesContainer = document.getElementById("Challenges");
const actionsContainer = document.getElementById("Actions");

// Fetch data from the API
fetch("http://localhost:8080/api/v1/card")
    .then((response) => response.json())
    .then((result) => {
        console.log(result);

        result.forEach((cardObj) => {
            const listElement = document.createElement("h4");
            listElement.innerHTML = cardObj.content;

            if (cardObj.section === "wwc") {
                listElement.className = "wentWell"; // Add CSS class for styling
                wentWellContainer.append(listElement);
            } else if (cardObj.section === "cfc") {
                listElement.className = "chall"; // Add CSS class for styling
                challengesContainer.append(listElement);
            } else if (cardObj.section === "aic") {
                listElement.className = "act"; // Add CSS class for styling
                actionsContainer.append(listElement);
            }
        });
    })
    .catch((error) => console.error(error));
