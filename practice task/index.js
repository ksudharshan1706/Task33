import express from "express"; //type in package.json should be module
import { MongoClient } from "mongodb";
//const express = require("express"); type in package.json should be commonjs // importing 3rd party package
const app = express(); // has all the rest api methods => GET,POST,PUT,DELETE

const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1"; // this url is responsible for connecting the DB.
//const MONGO_URL ="mongodb+srv://sudharshan:sudharshan@cluster0.vrgbtiq.mongodb.net";
const client = new MongoClient(MONGO_URL); // dial
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

app.get(
  "/movies",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const movies = await client
      .db("b39we")
      .collection("movies")
      .find({})
      .toArray();
    // here find return a curson -> which is actually a pagination. wee need to convert that into an array (.toArray())

    console.log("movies :", movies);
    response.send(movies);
  }
);

app.get(
  "/movies/:id",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    // const movie = movies.find((mv) => mv.id === id); //obj
    //const movie = movies.filter((mv) => mv.id === id); [obj]
    const movie = await client
      .db("b39we")
      .collection("movies")
      .findOne({ id: id });
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send("Movie not Found");
    //response.send(db("movies").movies.find({ id: id }));
  }
);

app.put(
  "/movies/:id",
  //  express.json(),
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    const updateData = request.body;
    const movie = await client
      .db("b39we")
      .collection("movies")
      .updateOne({ id: id }, { $set: updateData });
    console.log(movie);
    movie.modifiedCount > 0
      ? response.send({ message: "Updated movie Successfully" })
      : response.status(404).send("Movie not Found");
    //response.send(db("movies").movies.find({ id: id }));
  }
);

//express.json() => is a middleware which converts Data -> json format
app.post(
  "/movies",
  //express.json(),
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const data = request.body;
    console.log(data);
    const result = await client
      .db("b39we")
      .collection("movies")
      .insertMany(data);
    //db.movies.insertMany()
    response.send(result);
  }
);

app.delete(
  "/movies/:id",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    const result = await client
      .db("b39we")
      .collection("movies")
      .deleteOne({ id: id });
    console.log(result);
    result.deletedCount > 0
      ? response.send({ message: "Movie deleted successfully" })
      : response.status(404).send({ message: "Movie not Found" });
  }
);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
