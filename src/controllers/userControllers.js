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
      message: "Users retrieved successfully!",
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
      message: "User created successfully!",
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
    const { user } = req;

    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully!",
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
    const { user } = req;
    const { name, email } = req.body;
    await user.update({
      name,
      email,
    });

    res.status(200).json({
      status: "success",
      message: "User updated successfully!",
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

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: "disabled" });

    res.status(200).json({
      status: "success",
      message: "User disabled successfully!",
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
