const Repair = require("../models/repairModel");

exports.findRepairs = async (req, res) => {
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
    const { date, status, motorsNumber, description, UserId } = req.body;

    const repair = await Repair.create({
      date,
      status,
      motorsNumber,
      description,
      UserId,
    });

    res.status(201).json({
      status: "success",
      message: "repair created successfully!",
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
    const { repair } = req;

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

exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: "completed" });

    res.status(200).json({
      status: "success",
      message: "repair completed successfully!",
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
    const { repair } = req;

    await repair.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
      message: "repair cancelled successfully!",
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
