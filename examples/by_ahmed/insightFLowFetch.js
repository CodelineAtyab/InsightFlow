document.addEventListener("DOMContentLoaded", () => {
    const wentWellContainer = document.getElementById("went-well");
    const challengesContainer = document.getElementById("challenges");
    const actionsContainer = document.getElementById("actions");

    // Function to create a card with a delete button
    const createCard = (cardObj, className, container) => {
        const listElement = document.createElement("h4");
        listElement.className = className;
        listElement.innerText = cardObj.content;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "X";
        deleteBtn.onclick = () => {
            // Send DELETE request to the server
            fetch(`http://localhost:8080/api/v1/card/${cardObj.id}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove card from UI
                    container.removeChild(listElement);
                })
                .catch((error) => console.error("Error deleting card:", error));
        };

        // Append delete button to card
        listElement.appendChild(deleteBtn);
        return listElement;
    };

    // Fetch cards from the server and populate columns
    const populateColumns = () => {
        wentWellContainer.innerHTML = "";
        challengesContainer.innerHTML = "";
        actionsContainer.innerHTML = "";

        fetch("http://localhost:8080/api/v1/card")
            .then((response) => response.json())
            .then((result) => {
                result.forEach((cardObj) => {
                    let listElement;
                    if (cardObj.section === "wwc") {
                        listElement = createCard(cardObj, "wentWell", wentWellContainer);
                        wentWellContainer.appendChild(listElement);
                    } else if (cardObj.section === "cfc") {
                        listElement = createCard(cardObj, "chall", challengesContainer);
                        challengesContainer.appendChild(listElement);
                    } else if (cardObj.section === "aic") {
                        listElement = createCard(cardObj, "act", actionsContainer);
                        actionsContainer.appendChild(listElement);
                    }
                });
            })
            .catch((error) => console.error("Error fetching cards:", error));
    };

    // Initial fetch to populate columns
    populateColumns();
});
