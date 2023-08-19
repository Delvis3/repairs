const express = require("express");
const repairControler = require("./../controllers/repairControllers");
const validationMiddleware = require("./../middlewares/validationMiddleware");
const authMiddleware= require("../middlewares/authMiddleware");
const router = express.Router();
const repairsMiddleware = require("./../middlewares/repairsMiddleware");

router.use(authMiddleware.protect);

router
  .route("/")
  .get(repairControler.findRepairs)
  .post(validationMiddleware.validRepair, repairControler.createRepair);

router
  .use("/:id", repairsMiddleware.validRepair)
  .route("/:id")
  .get(repairControler.findRepair)
  .patch(repairControler.updateRepair)
  .delete(repairControler.deleteRepair);

module.exports = router;

