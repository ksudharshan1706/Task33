import express from "express";
import fs from "fs";

const app = express();

app.post("/createTextFile", (req, res) => {
  const folderPath = "backup";
  const fileName = `example1.txt`;
  const fileContent = new Date().toString(); // Setting the file content to the current timestamp

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
  const folderPath = "backup";
  const fileName = "example1.txt";

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
