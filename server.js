const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const AuthRouter = require("./Users/users.route");
const cors = require("cors");

const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/user", AuthRouter);


app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
