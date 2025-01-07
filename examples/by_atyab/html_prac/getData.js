const doTaskOne = async () => {
  return new Promise((resolve, rejected)=>{
    console.log("Doing Task One!");
    if (true) {
      resolve("We are GOOD!");
    } else {
      rejected("We are BAD!");
    }
  });
};

const printResults = async () => {
  try {
    const result = await doTaskOne();
    console.log(result);
  }
  catch (err) {

  }
};

printResults();


console.log("=== SCRIPT ENDS HERE ===");