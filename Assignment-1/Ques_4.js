const fs = require("fs");
const filePath = "data.txt";

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("File does not exist!");
    return;
  }

  const readStream = fs.createReadStream(filePath, "utf8");

  readStream.on("data", (chunk) => {
    console.log(chunk); 
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });

  readStream.on("end", () => {
    console.log("Finished reading file.");
  });
});
