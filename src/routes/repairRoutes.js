const express = require("express");
const repairControler = require("./../controllers/repairControllers");
const validationRepairMiddleware = require("./../middlewares/validationRepairMiddleware");
const router = express.Router();

router
  .route("/")
  .get(repairControler.findRepairs)
  .post(validationRepairMiddleware.validRepair, repairControler.createRepair);

router
  .route("/:id")
  .get(repairControler.findRepair)
  .patch(repairControler.updateRepair)
  .delete(repairControler.deleteRepair);

module.exports = router;

