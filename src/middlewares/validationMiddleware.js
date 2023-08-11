const { validationResult, body } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").custom((value) => {
    if (value.length < 5) {
      throw new "password must be at least 5 characters"();
    }

    if (!/[A-Z]/.test(value)) {
      throw new "password must be at least one uppercase letter"();
    }

    if (!/[a-z]/.test(value)) {
      throw new "password must be at least one lowercase letter"();
    }

    if (!/[0-9]/.test(value)) {
      throw new "password must be at least one number"();
    }

    // if (!/[+-<>"!"·$%&/()=?¿*`{[]}]/.test(value)) {
    //   throw new "password must be at least one character special"();
    // }
    return true;
  }),
  validateFields,
];

exports.validRepair = [
body("date").notEmpty().withMessage("date is required"),
body("status").notEmpty().withMessage("status is requierd"),
body("motorsNumber").notEmpty().withMessage("Motors Number is required"),
body("description").notEmpty().withMessage("Description is required"),
body("UserId").notEmpty().withMessage("ID to user is required"),
validateFields,
]

//  const {name, email, password} =req.body

//  if(!name){
//       return res.status(404).json({
//       status:"error",
//       message:"el nombre es requerido"
//       });
//  }

//  if(!email){
//   return res.status(404).json({
//   status:"error",
//   message:"el correo es requerido"
//   });
// }

// if(!password){
//      return res.status(404).json({
//      status:"error",
//      message:"el correo es requerido"
//      });
//    }

// next();

// };
