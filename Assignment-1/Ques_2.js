const fs = require("fs");  

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error("File not found!");
    } else {
      console.error("Some error occurred:", err);
    }
    return; 
  }

  console.log("File content:\n", data);
});
