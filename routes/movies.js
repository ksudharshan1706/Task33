import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getMovies,
  getMoviebyID,
  updateMoviebyID,
  createMovies,
  deleteMoviebyID,
} from "../helper.js";

const router = express.Router();
router.get(
  "/",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const movies = await getMovies();
    // here find return a curson -> which is actually a pagination. wee need to convert that into an array (.toArray())
    response.send(movies);
  }
);

router.get(
  "/:id",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    const movie = await getMoviebyID(id);
    movie ? response.send(movie) : response.status(404).send("Movie not Found");
    //response.send(db("movies").movies.find({ id: id }));
  }
);

router.put(
  "/:id",
  //  express.json(),
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    const updateData = request.body;
    const movie = await updateMoviebyID(id, updateData);
    console.log(movie);
    movie.modifiedCount > 0
      ? response.send({ message: "Updated movie Successfully" })
      : response.status(404).send("Movie not Found");
    //response.send(db("movies").movies.find({ id: id }));
  }
);

//express.json() => is a middleware which converts Data -> json format
router.post(
  "/",
  //express.json(),
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    //db.movies.insertMany()
    response.send(result);
  }
);

router.delete(
  "/:id",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { id } = request.params;
    console.log("id:", id);
    const result = await deleteMoviebyID(id);
    console.log(result);
    result.deletedCount > 0
      ? response.send({ message: "Movie deleted successfully" })
      : response.status(404).send({ message: "Movie not Found" });
  }
);

export const bookRouter = router;
