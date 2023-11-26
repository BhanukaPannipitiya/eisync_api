const User = require("../Models/user");
const bcrypt = require("bcrypt");

//signUp
exports.createUser = async (req, res) => {
  console.log("first", req.body);
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isActive: true,
    createdOn: Date.now(),
    country: req.body.country,
    loginPassword: req.body.loginPassword,
  });

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(user.loginPassword, saltRounds);

    user.loginPassword = hashPassword;
    const userdata = await User.insertMany(user);
    console.log(userdata);

    if (userdata) {
      return res.status(200).json({ message: "User created successfully" });
    }
  }
};

//login
exports.loginUser = async (req, res) => {
  console.log("first", req.body);
  const user = new User({
    email: req.body.email,
    loginPassword: req.body.loginPassword,
  });

  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(400).json({ message: "User does not exists" });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.loginPassword,
      existingUser.loginPassword
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      return res.status(200).json({ message: "Login successful" });
    }
  }
};
