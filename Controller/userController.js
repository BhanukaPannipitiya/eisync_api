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

exports.getUserDetailsById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("userId", id);

    const user = await User.findById(id);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      country: user.country,
    };
    console.log("userDetails", userDetails);

    return res.status(200).json({ userDetails });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { id } = req.body; // Assuming you'll pass the user ID in the request body
    const { name, phone, country } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name;
    user.phoneNumber = phone;
    user.country = country;

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User details updated successfully",
      updatedUser: {
        name: updatedUser.name,
        phoneNumber: updatedUser.phone,
        country: updatedUser.country,
      },
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
