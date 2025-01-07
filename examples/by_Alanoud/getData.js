const doTakOne = async () => {
    return new Promise((resolve, rejected) => {
        console.log("Doing Task One!");
        if (true) {
            resolve("we are good!");
        } else {
            rejected("we are bad!")
        }

    });
};
const printResults = async () => {
    const result = await doTakOne();
    console.log(result);
};
printResults();
console.log("script ends here")
