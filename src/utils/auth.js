import { response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../users/user.model";

//create new token
export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secretKey, {
    expiresIn: 10 * 60 * 1000,
  });
};

//verify token
export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secretKey, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password required bro" });
  }
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};
// create new user and response with a token,email,pwd,jwt

export const signin = async (req, res) => {};
//check if users credential valid or not,
//check hashed pwd(of user from DB and user signing in) if match or not ?
//if matched =>create
//TOKEN = (header[only encoded in base64, NOT ENCRYPT]+payload[only encoded in base64, NOT ENCRYPT]+signature[ENCRYPT]),
//if not => the signing in user is Not AUTHORISE

export const protect = async (req, res, next) => {
  next();
};
// protect api route
//for every single req to /api/route => exec protect and protect will look for the JWT in the Authorisation-Header
//grab the token from Authorisation-Header and run it through Verify fxn
//if Verfy passes => then good, if not => wrong token OR attacker
//Every Routes mounted at /api should user this------->
//don't put (protect) infront of (signup and signin) => else cannot (signup and signin), --->
//but in every [app.use('/api/... routes in server]
//`Bearer <bfkbkgfvlkjabf;kjbfgjbfgjb;fg;bg>`
//Verify Token: 1.Does it have a token 2.Is it formatted correctly 3. Is it a valid token
//if all 3 => passed the good to go
// protect also go to DB and get the entire user and
//and attached it to the request object b4 calling next() -->
//therefore after Verify Token -> no need to do (DB Query-- to see if this user exist or not )
//Eg: even if user passed Verification -> Is he still exist in DB(or he deleted his account yesterday):TEST
