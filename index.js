require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const routers = require("./api/router");

// middleware
app.use(express.json());

app.use(
  express.static("public", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);
app.use(
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.get("/", (req, res) => {
  res.send('<h1>Chat API</h1><a href="/api/v1/users">Chat route</a>');
});

app.use("/", routers);

// func to connectDB
const port = process.env.PORT || 9000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
