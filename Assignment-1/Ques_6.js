const fs = require("fs");

const inputFile = "input_ques_6.txt";
const outputFile = "output_ques_6.txt";

const readStream = fs.createReadStream(inputFile, "utf8");

const writeStream = fs.createWriteStream(outputFile);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Data successfully piped from input.txt to output.txt");
});

readStream.on("error", (err) => {
  console.error("Error reading input.txt:", err.message);
});

writeStream.on("error", (err) => {
  console.error("Error writing to output.txt:", err.message);
});
