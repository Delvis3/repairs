const express = require("express");

const userControler = require("./../controllers/userControllers");

const validationMiddleware = require("./../middlewares/validationMiddleware");
const userMiddleware= require("../middlewares/userMiddleware");
const authMiddleware= require("../middlewares/authMiddleware");
const router = express.Router();

router.post('login', userControler.login);

router
  .route("/")
  .get(authMiddleware.protect, userControler.findUsers)
  .post(validationMiddleware.validUser, userControler.createUser);

  router.use(authMiddleware.protect);

router
  .use("/:id", userMiddleware.validUser)
  .route("/:id")
  .get(userControler.findUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);
//  endpoint busca usuarios
// router.get ("/", userControler.findUsers);
//  endpoint crear usuario
// router.post("/", validationMiddleware.validUser ,userControler.createUser);
//  endpoint buscar usuario
// router.get("/:id", userControler.findUser);
//  endpoint actualizar
// router.patch("/:id", userControler.updateUser);
// endpoint borrar usuario
// router.delete("/:id", userControler.deleteUser);

module.exports = router;

