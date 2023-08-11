const Repair = require("../models/repairModel");

exports.validRepair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pendding",
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `the repair with id ${id} not found!`,
      });
    }
    req.repair = repair;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
    });
  }
};
