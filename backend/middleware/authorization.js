// This function checks if the user has a permission the passed permission

const authorization = (checkPermissions) => {
  return (req, res, next) => {
    const permissions = req.token.role.permissions;
    
    const hasPermission = checkPermissions.some(permission => permissions.includes(permission));

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }
  }
}


module.exports = authorization;

/**const authorization = (checkPermission) => {

  return (req, res, next) => {
  const permissions=req.token.role.permissions

      if(permissions.includes(checkPermission)){
          next();
      }
      else{
          res.status(403).json({
          success: false,
          massage: "Unauthorized"
          })  
      }
  }
} */