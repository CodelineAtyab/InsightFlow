const cardURL = "http://localhost:8080/card";
//function to add a card to a column
const addCardInCol = (givenClassName, givenContent, cardId, parentElemObj) => {
    const newDiv = document.createElement("div");
    newDiv.className = "align-heading-icon";

    const newLi = document.createElement("li");
    newLi.className = givenClassName;
    newLi.style.display = "inline-block";
    newLi.innerHTML = givenContent;

    const delIcon = document.createElement("i");
    delIcon.id = cardId;
    delIcon.className = "fa-regular fa-trash-can fa-lg";
    delIcon.style.cursor = "pointer";


    delIcon.onclick = function () {
        fetch(`${cardURL}/${this.id}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) this.parentElement.remove();
                else console.error("Failed to delete card.");
            })
            .catch((error) => console.error(error));
    };

    newDiv.appendChild(newLi);
    newDiv.appendChild(delIcon);
    parentElemObj.appendChild(newDiv);
};

//add cards to specific columns
const addToWwc = (givenContent, cardId, parentElemObj) => {
    addCardInCol("col1", givenContent, cardId, parentElemObj);
};

const addToCfc = (givenContent, cardId, parentElemObj) => {
    addCardInCol("col2", givenContent, cardId, parentElemObj);
};

const addToAic = (givenContent, cardId, parentElemObj) => {
    addCardInCol("col3", givenContent, cardId, parentElemObj);
};

//fetch existing cards from the server and display them
fetch(cardURL)
    .then((response) => response.json())
    .then((jsonResponse) => {
        jsonResponse.forEach(cardObj => {
            const [colId, cardId] = cardObj.id.split("_");

            const cardIdPattern = /^[a-z]+[_][0-9]+$/;
            if (cardIdPattern.test(cardObj.id)) {
                const activeCol = document.getElementById(colId);
                if (colId === "wwc") {
                    addToWwc(cardObj.content, cardObj.id, activeCol);
                } else if (colId === "cfc") {
                    addToCfc(cardObj.content, cardObj.id, activeCol);
                } else {
                    addToAic(cardObj.content, cardObj.id, activeCol);
                }
            }
        });
    })
    .catch((error) => console.error(error));

//function to add a new card
const addMsg = () => {
    const selectedColumnID = document.getElementById("colSelector").value;
    const userInputMsg = document.getElementById("userMsg").value;
    if (!userInputMsg.trim()) {
        alert("Please enter a valid message.");
        return;
    }

    //create a unique card ID based on the current time for simplicity
    const cardId = `${selectedColumnID}_${Date.now()}`;


    //Gets ul element corresponding to "wwc", "cfc", or "aic" so the new card can be added
    const selectedColumn = document.getElementById(selectedColumnID);

    //add the card to the selected column
    addCardInCol(selectedColumnID, userInputMsg, cardId, selectedColumn);


    //send a POST request to the server to save the card
    fetch(cardURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cardId, content: userInputMsg }),
    })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to save card.");
            return response.json();
        })
        .catch((error) => console.error(error));

    //clear the input field
    document.getElementById("userMsg").value = "";
};
