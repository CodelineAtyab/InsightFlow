console.log("HELLO WE ARE GOING TO SEE SOME EXAMPLES HERE!");

setTimeout(() => {
  console.log("Function 1 Ends after 10 seconds");
}, 10000);
setTimeout(() => {
  console.log("Function 2 Ends after 5 seconds");
}, 5000);

console.log("We Are Done!!!");

const runJob = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{console.log("Task Done!!!");}, 5000)
    resolve(true);
  });
};
