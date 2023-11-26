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
    const userdata = await user.save(); // Use save() instead of insertMany()

    console.log(userdata);

    if (userdata) {
      const { _id } = userdata; // Extract user ID from the inserted document

      return res.status(200).json({
        message: "User created successfully",
        userId: _id, // Send user ID to the frontend
      });
    }
  }
};


//login
exports.loginUser = async (req, res) => {
  console.log("first", req.body);
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.loginPassword,
      existingUser.loginPassword
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      // Send user ID along with the success message
      return res.status(200).json({
        message: "Login successful",
        userId: existingUser._id,
      });
    }
  }
};

exports.getUserEmailById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("userId", id); 

    const user = await User.findById(id);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;
    console.log("userEmail", userEmail);

    return res.status(200).json({ userEmail });
  } catch (error) {
    console.error("Error retrieving user email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



