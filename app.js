const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
// Add cors middleware
const cors = require("cors");
const connectDB = require("./db/connect");
const usersRouter = require("./routes/users");
const friendRouter = require("./routes/friendList");
const bodyParser = require("body-parser");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/imgs"));

app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Chat API</h1><a href="/api/v1/users">Chat route</a>');
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/friendList", friendRouter);

// products route
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

const port = process.env.PORT || 3000;

// func to connectDB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
