// Declaration of Parent Element Objects
const cardURL = "http://localhost:8080/api/v1/card";

// Utility Functions
const addCardInCol = (givenClassName, givenContent, cardId, parentElemObj) => {
  // <i class="fa-regular fa-trash-can fa-lg"></i>
  const newDiv = document.createElement("div");
  newDiv.className = "align-heading-icon";
  
  const newH3 = document.createElement("h3");
  newH3.className = givenClassName;
  newH3.innerHTML = givenContent;

  const delIcon = document.createElement("i");
  delIcon.id = cardId;
  delIcon.className = "fa-regular fa-trash-can fa-lg";
  delIcon.onclick = function () {
    console.log(`Click and ID is ${this.id}`);

    fetch(`${cardURL}/${this.id}`, {method: "DELETE"})
    .then((response) => {
      console.log(response.status);
      if(response.status == 200) {
        this.parentElement.remove();
      }
    })
    .catch((errMsg) => {
      console.log(errMsg);
    })
  };

  newDiv.append(newH3);
  newDiv.append(delIcon);
  parentElemObj.appendChild(newDiv);
};

const addToWwc = (givenContent, cardId, parentElemObj) => {
  addCardInCol("li1", givenContent, cardId, parentElemObj);
};

const addToCfc = (givenContent, cardId, parentElemObj) => {
  addCardInCol("li4", givenContent, cardId, parentElemObj);
};

const addToAic = (givenContent, cardId, parentElemObj) => {
  addCardInCol("li6", givenContent, cardId, parentElemObj);
};

// [
//   {
//       "id": "wwc_1",
//       "content": "We are almost done!"
//   },
//   {
//       "id": "wwc_2",
//       "content": "We made it ourselves!"
//   },
//   {
//       "id": "cfc_3",
//       "content": "Sometimes, its too much to take in."
//   }
// ]

fetch(cardURL)
  .then((response) => response.json())
  .then((jsonResponse) => {
    jsonResponse.forEach(cardObj => {
      
      const [colId, cardId] = cardObj.id.split("_");
      console.log(`${colId} -- ${cardId}`);

      const cardIdPattern = /^[a-z]+[_][0-9]+$/;
      if (cardIdPattern.test(cardObj.id)) {
        const activeCol = document.getElementById(colId);
        if (colId == "wwc") {
          addToWwc(cardObj.content, cardObj.id, activeCol);
        } else if (colId == "cfc") {
          addToCfc(cardObj.content, cardObj.id, activeCol);
        } else {
          addToAic(cardObj.content, cardObj.id, activeCol);
        }
      }
    });
  })
  .catch((error) => console.error(error));

  