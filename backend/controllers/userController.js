const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const verifyEmail = (email) => {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,5}$/g;

  return re.test(email);
};

const userController = {
  // --> Login the user and assign him a token (jwt).
  // --> POST /api/users/login

  login: expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new Error("invalid Email or Password, Try again.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid Email or Password, Try again.");
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      res.status(400);
      throw new Error("Invalid Email or Password, Try again.");
    }

    return res.status(200).json({
      msg: "login successfull",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }),

  // --> Register a user and authenticate him/her.
  // --> POST /api/users

  register: expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!verifyEmail(email)) {
      res.status(400);
      throw new Error("Invalid data.");
    }

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists, Login or Try again.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      msg: "user registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }),

  // --> Get access to user's profile (protected Route) using middleware.
  // --> GET /api/users/profile

  profile: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("Invalid request :- No user found.");
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }),

  // --> update the user's profile (protected Route) using middleware.
  // --> PUT /api/users/profile

  updateProfile: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const oldPassword = user.password;

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const userOldPassword = req.body.oldPassword;
      const userNewPassword = req.body.newPassword;

      if (userNewPassword) {
        if (!userOldPassword) {
          res.status(400);
          throw new Error("Enter Your Old Password");
        }
      }

      if (userOldPassword) {
        if (!userNewPassword) {
          res.status(400);
          throw new Error("Enter New Password");
        }

        const verifyUser = await bcrypt.compare(userOldPassword, oldPassword);

        if (!verifyUser) {
          res.status(404);
          throw new Error("Old Password is wrong, Try remembering it.");
        }

        if (userOldPassword === userNewPassword) {
          res.status(400);
          throw new Error("New Password cannot be same as old Password");
        }

        const hashedPassword = await bcrypt.hash(userNewPassword, 10);

        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("Some error occurred, Try again OR No user found.");
    }
  }),

  // --> update the user's profile By Admin(protected Route (ADMIN))
  // --> PUT /api/users/:id

  updateUser: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user.isAdmin) {
      if (user.name === "Zaiem" || user.name === "admin") {
        res.status(404);
        throw new Error("you cannot Update information for this account.");
      }
    }

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("Some error occurred, Try again OR No user found.");
    }
  }),

  // --> Get all users only Admin.
  // --> GET /api/users/

  getAllUsers: expressAsyncHandler(async (req, res) => {
    const users = await User.find({});

    if (!users) {
      res.status(400);
      throw new Error("No users found in the database.");
    }

    res.status(200).json(users);
  }),

  // --> Get a user detail by Id only Admin.
  // --> GET /api/users/:id

  getUserById: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("No users found in the database.");
    }

    res.status(200).json(user);
  }),

  // --> Delete a user only Admin.
  // --> DELETE /api/users/:id

  deleteUser: expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("No User Found.");
    }

    if (user.isAdmin) {
      if (user.name === "Zaiem" || user.name === "admin") {
        res.status(404);
        throw new Error("you cannot delete main Admins");
      }
    }

    await User.findByIdAndDelete(user._id);
    res.status(200).json({
      message: "User deleted successfully.",
      name: user.name,
      id: user._id,
    });
  }),
};

module.exports = userController;
