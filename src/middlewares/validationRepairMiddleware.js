exports.validRepair = (req, res, next) => {
  const { date, status, UserId } = req.body;

  if (!date) {
    return res.status(404).json({
      status: "error",
      message: "la fecha es requerida",
    });
  }

  if (!status) {
    return res.status(404).json({
      status: "error",
      message: "el status es requerido",
    });
  }

  if (!UserId) {
    return res.status(404).json({
      status: "error",
      message: "el Id de cliente es requerido",
    });
  }

  next();
};
