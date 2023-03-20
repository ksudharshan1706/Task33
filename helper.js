import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function deleteMoviebyID(id) {
  return await client.db("b39we").collection("movies").deleteOne({ id: id });
}
export async function createMovies(data) {
  return await client.db("b39we").collection("movies").insertMany(data);
}
export async function updateMoviebyID(id, updateData) {
  return await client
    .db("b39we")
    .collection("movies")
    .updateOne({ id: id }, { $set: updateData });
}
export async function getMoviebyID(id) {
  return await client.db("b39we").collection("movies").findOne({ id: id });
}
export async function getMovies() {
  return await client.db("b39we").collection("movies").find({}).toArray();
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //10 is the number of routes[bcrypt.genSalt(no. of routes)]
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

export async function createUser(userName, hashedPassword) {
  return await client
    .db("b39we")
    .collection("users")
    .insertOne({ userName: userName, hashedPassword: hashedPassword });
}

export async function getUserByName(userName) {
  return await client
    .db("b39we")
    .collection("users")
    .findOne({ userName: userName });
}
