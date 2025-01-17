const apiUrl = `http://${window.location.host}/card`;

const whatWentWellList = [];
const challengesList = [];
const actionList = [];
const cardIdSet = new Set();
const wwcDivObj = document.getElementById("whatWentWellColumn");
const challengesDivObj = document.getElementById("challengesColumn");
const actionDivObj = document.getElementById("actionListColumn");

let selDropdownElemId = null;

fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => {
        result.forEach(element => {
            if (cardIdSet.has(element.id)) {
                console.error("Duplicate card. Skipping!");
            } else if (element.content == '' || element.cardCategory == ''){
                console.error("Null card, skipping!")
            } else {
                if (element.cardCategory == "wwOption") {

                    whatWentWellList.push(element.content);
                    const wwcDivObj = document.getElementById("whatWentWellColumn");
                    let newSpanObj = document.createElement("h5");
                    newSpanObj.setAttribute('id', element.id);
                    newSpanObj.innerHTML = `${element.content} <img src="delete.png" class="delete-btn" onclick="deleteCard('${element.id}')" >`;
                    newSpanObj.className = "wentWellobject";

                    wwcDivObj.append(newSpanObj);
                }
                // adding to challenges array and loop (start)
                else if (element.cardCategory == "cfOption") {

                    challengesList.push(element.content);
                    const challengesDivObj = document.getElementById("challengesColumn");

                    let newSpanObj = document.createElement("h5");
                    newSpanObj.setAttribute('id', element.id)
                    newSpanObj.innerHTML = `${element.content} <img src="delete.png" class="delete-btn" onclick="deleteCard('${element.id}')" >`;
                    newSpanObj.className = "ChallengesObject";

                    challengesDivObj.append(newSpanObj);

                    // adding to challenges array and loop (end)
                }

                // adding to action list array and loop (start)
                else if (element.cardCategory == "aicOption") {

                    actionList.push(element.content);
                    const actionDivObj = document.getElementById("actionListColumn");
                    let newSpanObj = document.createElement("h5");
                    newSpanObj.id = crypto.randomUUID();
                    newSpanObj.innerHTML = `${element.content} <img src="delete.png" class="delete-btn" onclick="deleteCard('${element.id}')" >`;
                    newSpanObj.className = "actionListObject";
                    actionDivObj.append(newSpanObj);

                    // adding to action array and loop (end)
                }
                cardIdSet.add(element.id);
            }
        });
    })
    .catch((error) => console.error(error));



const addMesssage = () => {
    const inputValue = document.getElementById("input").value;


    if(selDropdownElemId === null || inputValue === ''){

    } else{
        const newListItem = document.createElement("h5");

        if (selDropdownElemId == "wwOption") {
            newListItem.className = "wentWellobject";
            newListItem.id = crypto.randomUUID();
            const uuid = newListItem.id.toString();
            newListItem.innerHTML = `${inputValue} <img src="delete.png" class="delete-btn" onclick="deleteCard('${uuid}')">`;
    
            wwcDivObj.append(newListItem);
    
        } else if (selDropdownElemId == "cfOption") {
            newListItem.className = "ChallengesObject"
            newListItem.id = crypto.randomUUID();
            const uuid = newListItem.id.toString();
            newListItem.innerHTML = `${inputValue} <img src="delete.png" class="delete-btn" onclick="deleteCard('${uuid}')">`;
    
            challengesDivObj.append(newListItem);
    
        } else if (selDropdownElemId == "aicOption") {
            newListItem.className = "actionListObject"
            newListItem.id = crypto.randomUUID();
            const uuid = newListItem.id.toString();
            newListItem.innerHTML = `${inputValue} <img src="delete.png" class="delete-btn" onclick="deleteCard('${uuid}')">`;
    
            actionDivObj.append(newListItem);
        }
        const raw = JSON.stringify({
            "id": newListItem.id,
            "content": document.getElementById("input").value,
            "cardCategory": selDropdownElemId,
        });
    
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: raw,
        };

        fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    }
    



}
const changeBoardName = () => {
    const boardTitleObj = document.getElementById("codeArchitectsHeader");
    boardTitleObj.innerHTML = document.getElementById("input2").value;
}

const checkIndex = (anchorElement) => {
    selDropdownElemId = anchorElement.id;
}

const deleteCard = (id) => {
    fetch(`${apiUrl}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

    const itemTobeDelted = document.getElementById(id);
    itemTobeDelted.remove();
  }
const requestOptions = {
  method: "DELETE"
};