require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../db/connect");
const routers = require("./router");

// middleware
app.use(express.json());
app.use(express.static("public"));
//app.use("/uploads", express.static("uploads"));
app.use(express.static("uploads"));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// routes
app.get("/", (req, res) => {
  res.send('<h1>Chat API</h1><a href="/api/v1/users">Chat route</a>');
});

//Cambio para AD:
// A medida que las apps crecen nuevas rutas y partes aparecen. Al principo puede ser poco pero luego harán dificil
//de leer y mantener el app.js. Es preferible agregar un index.js en el directorio de routes y usar las rutas desde ahí
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
