import express from "express"; //type in package.json should be module
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { bookRouter } from "./routes/movies.js";
import { userRouter } from "./routes/users.js";
dotenv.config();
//const express = require("express"); type in package.json should be commonjs // importing 3rd party package
const app = express(); // has all the rest api methods => GET,POST,PUT,DELETE
const PORT = process.env.PORT;
//const MONGO_URL = "mongodb://127.0.0.1"; // this url is responsible for connecting the DB.
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json());
//Home page
app.get(
  "/",
  function (
    request,
    response // similar to Routing setup in react
  ) {
    response.send("🙋‍♂️, 🌏 🎊✨ HELLO");
  }
);

app.use("/movies", bookRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

//hash password generation
// async function genPassword(password) {
//   const salt = await bcrypt.genSalt(10); //10 is the number of routes[bcrypt.genSalt(no. of routes)]
//   console.log(salt);
//   const hashPassword = await bcrypt.hash(password, salt);
//   console.log(hashPassword);
//   return hashPassword;
// }
// console.log(genPassword("password"));
