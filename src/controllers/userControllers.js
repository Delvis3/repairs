const User = require("../models/userModel");
const bycrypt = require('bcryptjs');
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

    const salt = await bycrypt.genSaltSync(12);
    const hashPassword = await bycrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password : hashPassword,
      role,
    });

    
    const token = await generateJWT(user.id);

    res.status(201).json({
      status: 'success',
      token,
      user,});

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
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  if (!(await bycrypt.compare(password, user.password))) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error!",
      error,
    });
  }
};