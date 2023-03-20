import express, { response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genPassword, createUser, getUserByName } from "../helper.js";

const router = express.Router();
router.post(
  "/signup",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { userName, password } = request.body;
    //console.log(userName, password);
    const isUserExist = await getUserByName(userName);
    if (isUserExist) {
      response.status(400).send({ mesage: "Username already taken!!" });
      return;
    }
    if (
      !/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#!@%&]).{8,}$/g.test(
        password
      )
    ) {
      response.status(400).send({ message: "Password pattern does not match" });
      return;
    }
    const hashedPassword = await genPassword(password);
    const result = await createUser(userName, hashedPassword);
    response.send(result);
  }
);

router.post(
  "/login",
  async function (
    request,
    response // similar to Routing setup in react
  ) {
    const { userName, password } = request.body;

    const userFromDb = await getUserByName(userName);
    const storedPassword = userFromDb.hashedPassword;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if (!userFromDb || !isPasswordMatch) {
      response.status(400).send({ mesage: "Invalid Credentials!!" });
      return;
    }
    const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY);
    response.send({ message: "Successfully Logged in", token: token });
  }
);
export const userRouter = router;
