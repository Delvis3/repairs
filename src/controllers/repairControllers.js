const User = require("../models/userModel");
const Repair = require("../models/repairModel");

exports.findRepairs = async(req, res) => {
  try {
    const repair = await Repair.findAll({
      where: {
        status: "pendding",
      },
    });

    return res.status(200).json({
      status: "success",
      message: "repair retrieved successfully!",
      results: repair.length,
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, status, UserId } = req.body;

    const repair = await Repair.create({
      date,
      status,
      UserId,
    });

    res.status(201).json({
      status: "success",
      message: "product created successfully!",
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.findRepair = async (req, res) => {
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
    return res.status(200).json({
      status: "success",
      message: "user retrieved successfully!",
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.updateRepair = async(req, res) => {
  try {
    const { id } = req.params;
    const { date, status, UserId } = req.body;

    const repair = await Repair.findOne({
      where: {
        id,
        status:"pendding",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `the repair with id ${id} not found!`,
      });
    }

    const repairUpdated = await repair.update({
      date,
      status,
      UserId,
    });

    res.status(200).json({
      status: "success",
      message: "repair updated successfully!",
      product: repairUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status:"pendding",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `the repair with id ${id} not found!`,
      });
    }

    await repair.update({ status:"cancelled" });

    res.status(200).json({
      status: "success",
      message: "repair deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
      error,
    });
  }
};
