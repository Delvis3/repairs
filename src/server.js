require("dotenv").config();
const app = require("./app");

const { db } = require("./database/config");

//me autentica contra la base de datos
db.authenticate()
  .then(() => console.log("Database connected...😎"))
  .catch((err) => console.log(err));

//me sincroniza con la base de datos
db.sync()
  .then(() => console.log("Database synchronized...😎"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port => ${PORT}`);
});
