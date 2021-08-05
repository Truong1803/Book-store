const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paymentModel");

const userController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exits." });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      //save data
      await newUser.save();
      //then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });
      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exits." });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      //if login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });
      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken(req, res) {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async getUser(req, res) {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  async addCart(req, res) {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  async history(req, res) {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.json(history);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "11m",
  });
};
const createRefreshToken = (userId) => {
  return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userController;
