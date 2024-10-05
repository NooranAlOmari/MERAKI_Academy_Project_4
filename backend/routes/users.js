const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");
const {
  register,
  login,
  getAllUser,
} = require("../controllers/users");

// define router
const usersRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/users/register
 */

/*
 * Testing Object:
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 27,
  "country": "Jordan",
  "email":"John@hotmail.com",
  "password": "123456",
  "role":"61d03786a0848857b2c15026"
}
*/

usersRouter.post("/register", register);
/*
 * Testing Routes:
 * POST -> http://localhost:5000/users/login
 */

/*
 * Testing Object:
{
  "email":"John@hotmail.com",
  "password": "123456"
}
*/
usersRouter.post("/login", login);



///////////////////
/* JUST FOR ADMIN*/
//////////////////
usersRouter.get("/",authentication,authorization('view_users'), getAllUser);



module.exports = usersRouter;
