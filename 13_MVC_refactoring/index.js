const express = require("express");
const connection = require('./dbConnection/connection.js');
const userRouter = require("./routes/user.route.js");
const logger = require("./middleware/index.js");
const app = express();
const PORT = 8023;

//Connection
connection();



//Middlewares
app.use(express.json());
app.use(logger("log.txt"));



//Routes
app.use("/api/v1/user", userRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
