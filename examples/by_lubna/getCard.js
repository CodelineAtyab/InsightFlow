
const cardURL = "http://localhost:8080/api/v1/card";

// Utility Functions
const addCardInCol = (givenClassName, givenContent, cardId, parentElemObj) => {
  if (!parentElemObj) {
    console.error(`Parent element for class "${givenClassName}" not found.`);
    return;
  }

  const newDiv = document.createElement("div");
  newDiv.className = "align-heading-icon";

  const newH3 = document.createElement("h3");
  newH3.className = givenClassName;
  newH3.innerHTML = givenContent;

  const delIcon = document.createElement("i");
  delIcon.id = cardId;
  delIcon.className = "fa-regular fa-trash-can fa-lg";
  delIcon.onclick = function () {
    fetch(`${cardURL}/${this.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 200) {
          this.parentElement.remove();
          console.log(`Card with ID ${this.id} deleted successfully.`);
        } else {
          console.error(`Failed to delete card with ID ${this.id}. Status: ${response.status}`);
        }
      })
      .catch((errMsg) => console.error(`Error deleting card with ID ${this.id}:`, errMsg));
  };

  newDiv.append(newH3);
  newDiv.append(delIcon);
  parentElemObj.appendChild(newDiv);
};

const addToWwc = (givenContent, cardId, parentElemObj) => {
  addCardInCol("wwc", givenContent, cardId, parentElemObj);
};

const addToCfc = (givenContent, cardId, parentElemObj) => {
  addCardInCol("cfc", givenContent, cardId, parentElemObj);
};

const addToAic = (givenContent, cardId, parentElemObj) => {
  addCardInCol("aic", givenContent, cardId, parentElemObj);
};

// Get Cards from API
fetch(cardURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch cards. Status: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonResponse) => {
    jsonResponse.forEach((cardObj) => {
      const parts = cardObj.id.split("_");
      if (parts.length === 2) {
        const [colId, cardId] = parts;
        const cardIdPattern = /^[a-z]+_[0-9]+$/;

        if (cardIdPattern.test(cardObj.id)) {
          const activeCol = document.getElementById(colId);

          if (!activeCol) {
            console.error(`Column "${colId}" does not exist in the DOM.`);
            return;
          }

          if (colId === "wwc") {
            addToWwc(cardObj.content, cardObj.id, activeCol);
          } else if (colId === "cfc") {
            addToCfc(cardObj.content, cardObj.id, activeCol);
          } else {
            addToAic(cardObj.content, cardObj.id, activeCol);
          }
        } else {
          console.error(`Invalid card ID format: ${cardObj.id}`);
        }
      } else {
        console.error(`Card ID "${cardObj.id}" does not have the correct format.`);
      }
    });
  })
  .catch((error) => console.error("Error fetching cards:", error));

  const addMsg = () => {
    // Get the selected column ID and user message input
    const selectedColID = document.getElementById("colSelector").value; // Example: 'wwc', 'cfc', 'aic'
    const userInput = document.getElementById("userMsg").value; // Example: 'good'
    const cardId = `${selectedColID}_${Date.now()}`;
    const selectedColumn = document.getElementById(selectedColID);
    
    addCardInCol(selectedColID, userInput, cardId, selectedColumn);
    document.getElementById("userMsg").value = ""; //delete the message 
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: cardId,
        content: userInput,
      }),
    };

    fetch(cardURL, requestOptions).then((response) => response.json());
  };
  

