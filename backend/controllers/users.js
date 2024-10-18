const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');/*****/


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
    role:"67007c95b2e85f1f89763cbc",
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Registration successful! You can now log in.`,
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
        console.log (result)
        const isAdmin = result.role.role === 'admin';
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          isAdmin: isAdmin
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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////******googleLogin******////

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const { idToken } = req.body; // Get idToken from login request
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if the user exists in the database
        let user = await usersModel.findOne({ email });

        if (!user) {
            // If the user does not exist, create it.
            user = new usersModel({
                email,
                firstName: name,
                password: 'google-auth', //random password or not store a password.
                role: "67007c95b2e85f1f89763cbc", 
            });
            await user.save();
        }

        // Generate JWT token
        const payloadJwt = {
            userId: user._id,
            email: user.email,
            role: {
              "role": "admin",
              "permissions": [
                "admin"
              ]
            },/******************
            عشان تصير زي توكن العادية عملت ديكوديد و قلدتها....و عشان تزبط اوثرايزيشن****** */
            
        };

        const token = jwt.sign(payloadJwt, process.env.SECRET, { expiresIn: '60m' });

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            isAdmin: user.role === 'admin',
        });
    } catch (error) {
        console.error('Error during Google login:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};




module.exports = {
  register,
  login,
  getAllUser,
  getUserById, 
  updateUserById, 
  deleteUserById,
  googleLogin
};
