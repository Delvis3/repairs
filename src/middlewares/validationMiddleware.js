exports.validUser = (req, res, next) =>{
 const {name, email, password} =req.body

 if(!name){
      return res.status(404).json({
      status:"error",
      message:"el nombre es requerido"
      });
 }

 if(!email){
  return res.status(404).json({
  status:"error",
  message:"el correo es requerido"
  });
}

if(!password){
     return res.status(404).json({
     status:"error",
     message:"el correo es requerido"
     });
   }
   
next();

};