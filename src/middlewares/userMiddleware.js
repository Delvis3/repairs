const User = require("../models/userModel");

exports.validUser = async (req, res, next) => {
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
        status: "Error",
        message: `User with id ${id} not fount`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
    });
  }
 
};


