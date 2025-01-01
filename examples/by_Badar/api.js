fetch("http://localhost:8080/card")
.then((response) => response.json())
.then((result) => {})
.catch((error) => console.error(error));

const selectorItem = document.getElementById("selectorPost");
// adding to what went array and loop (start)
const whatWentWellList = [];
whatWentWellList.push("we had revisions");
whatWentWellList.push("We had tasks that gave us a good idea about HTM");
whatWentWellList.push("We are motivated");
const wwcDivObj = document.getElementById("whatWentWellColumn");
for(let i = 0; i<whatWentWellList.length; i++){
    let newSpanObj = document.createElement("h3");
    newSpanObj.innerHTML = whatWentWellList[i];
    newSpanObj.className = "wentWellobject";
    
    wwcDivObj.append(newSpanObj);
}
// adding to what went array and loop (end)

// adding to challenges array and loop (start)
const challengesList = [];
challengesList.push("Time restrictions");
challengesList.push("Focusing at the end of the session");
const challengesDivObj = document.getElementById("challengesColumn");
for(let i = 0; i<challengesList.length; i++){
    let newSpanObj = document.createElement("h3");
    newSpanObj.innerHTML = challengesList[i];
    newSpanObj.className = "ChallengesObject";
    
    challengesDivObj.append(newSpanObj);
}
// adding to challenges array and loop (end)


// adding to action list array and loop (start)
const actionList = [];
actionList.push("Read more about CSS");
actionList.push("work harder");
const actionDivObj = document.getElementById("actionListColumn");
for(let i = 0; i<actionList.length; i++){
    let newSpanObj = document.createElement("h3");
    newSpanObj.innerHTML = actionList[i];
    newSpanObj.className = "actionListObject";
    
    actionDivObj.append(newSpanObj);
}
// adding to action array and loop (end)


 const addMesssage = () => {
    const newListItem = document.createElement("h3");
    newListItem.innerHTML = document.getElementById("input").value;
    
    if(checkIndex() == "What went Well"){
    newListItem.className = "wentWellobject";
    
    wwcDivObj.append(newListItem);

    } else if (checkIndex() == "Challenges Faced"){
    newListItem.className = "ChallengesObject"

    challengesDivObj.append(newListItem);

    } else if(checkIndex() == "Action items"){
    newListItem.className = "actionListObject"

    actionDivObj.append(newListItem);
    }

 }
 const changeBoardName =() => {
    const boardTitleObj = document.getElementById("codeArchitectsHeader");
    boardTitleObj.innerHTML = document.getElementById("input2").value;
 }

 const checkIndex = () =>{
    return selectedOption = selectorItem.options[selectorItem.selectedIndex].innerHTML
 }
