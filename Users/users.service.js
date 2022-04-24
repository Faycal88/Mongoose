const AuthController = require("./users.controller");

function loginHandler(req, res) {
    const { email, password } = req.body;
  
    AuthController.loginWithEmail(email, password)
      .then((userData) => {
        res.send(userData);
      })
      .catch((err) => {
        res.status(404);
        console.log(err);
        res.send({
          message: "login failed",
        });
      });
  }
  
  function registerHandler(req, res) {
      const { email, age, password, name } = req.body;
    const userDetails = {
        email,
        age,
      password,
      name,
    };
    AuthController.register(userDetails)
      .then((userData) => {
        res.status(201);
        res.send(userData);
      })
      .catch((err) => {
        res.status(400);
        res.send({ message: "register failed" });
      });
  }
  
  module.exports = {
    loginHandler,
    registerHandler,
  };