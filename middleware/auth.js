import jwt from "jsonwebtoken";

export const auth = (req, resp, next) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    resp.send({ error: err.message });
  }
};
