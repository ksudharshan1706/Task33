import express from "express";
import fs from "fs";

// const fs = require("fs");
// const fs1 = fs;
const app = express();

app.post("/createTextFile", (req, res) => {
  const folderPath = "backup"; // Replace with the path to your desired folder
  const fileName = `example1.txt`; // Use the current timestamp to generate the filename

  const fileContent = new Date().toString(); // Set the file content to the current timestamp

  fs.writeFile(`${folderPath}/${fileName}`, fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file.");
    } else {
      res.send(`File ${fileName} created successfully.`);
    }
  });
});

app.get("/readTextFile", (req, res) => {
  const folderPath = "backup"; // Replace with the path to your desired folder
  const fileName = "example1.txt"; // Replace with the desired file name

  fs.readFile(`${folderPath}/${fileName}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file.");
    } else {
      res.send(data);
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000.");
});
