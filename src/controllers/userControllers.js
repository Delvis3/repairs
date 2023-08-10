const User = require("../models/userModel");

exports.findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "available",
      },
    });

    return res.status(200).json({
      status: "success",
      message: "users retrieved successfully!",
      results: users.length,
      users,
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

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      status: "success",
      message: "product created successfully!",
      user,
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

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `the user with id ${id} not found!`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "user retrieved successfully!",
      user,
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status:"available",
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `the user with id ${id} not found!`,
      });
    }

    const userUpdated = await user.update({
      name,
      email,
      password,
      role,
    });

    res.status(200).json({
      status: "success",
      message: "user updated successfully!",
      product: userUpdated,
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

exports.deleteUser = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status:"available",
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `the user with id ${id} not found!`,
      });
    }

    await user.update({ status:"disabled" });

    res.status(200).json({
      status: "success",
      message: "product deleted successfully!",
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
