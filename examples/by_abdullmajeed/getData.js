const doTaskOne = async () => {
    return new Promise((resolve, rejected) => {
        console.log("Doing Task One!");
        if (true) {
            resolve("We are GOOD!")
        } else {
            rejected("We are BAD!")
        }
    });
};

const printResults = async () => {
    const result = await doTaskOne();
    console.log(result);
    

};

printResults();







console.log("=== SCRIPT ENDS HERE ===");
