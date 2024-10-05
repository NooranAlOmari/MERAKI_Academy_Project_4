const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates a new author (new user)
const register = (req, res) => {
  const { firstName, lastName, age, country, email, password} = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role:"6700899e810b83f37a76ea2d",
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function checks user login credentials
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          author: result.firstName,
          role: result.role,
          country: result.country,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};



///////////////////
/* JUST FOR ADMIN*/
//////////////////
const getAllUser = (req, res) => {
  usersModel.find({})
  .populate("role")
  .then((result) => {
    res.status(200).json({
    success: true ,
    message: "All the users",
    Users : result
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
    success: false,
    message: "Server Error",
    err: err.message
    });
  });
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await usersModel.findById(userId).populate('role');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(userId, updates, { new: true });
    res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    await usersModel.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  register,
  login,
  getAllUser,
  getUserById, 
  updateUserById, 
  deleteUserById,
};
