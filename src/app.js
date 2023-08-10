// console.log("hola"); provando q se estauviese ejecutando el archivo
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const repairRoutes = require("./routes/repairRoutes");
const  morgan = require("morgan");

const app = express();
console.log("d3");

app.get("/", (req, res) => {
  console.log("Me ejecute! 😎😎");
  res.send("hola mundo desde el servidor 🙌");
});

//midelware para parcear o recibir datos q vienen en el body de la req
app.use(express.json());
// mildeware de morgan, este sirve para hacerle seguimiento de una mejor manera en desarrollo a las peticiones
app.use(morgan("dev"));

const getTimeRequest = (req, res, next) => {
  const date = new Date();
  
  req.requestTime = date;

  next();
};  
// midelware getTimeRequest, para usar midelware se usa el app.use()
app.use(getTimeRequest);
// parte del enpoint que se concatena con los q estan en userRoutes
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/repairs" , repairRoutes);
// escuchador
module.exports = app;
