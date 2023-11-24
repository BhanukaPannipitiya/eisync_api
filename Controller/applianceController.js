const Appliance = require("../Models/appliance");

exports.AddAppliance = async(req, res) => {
  console.log("first", req.body)
    const appliance = new Appliance({
      deviceType: req.body.deviceType,
      power: req.body.power,      
      voltage: req.body.voltage,       
      onHours: req.body.onHours,         
      deviceModel: req.body.deviceModel,
      deviceBrand: req.body.deviceBrand,
      isActive: true,      // Remove quotes
      createdOn: Date.now(),
      userId: req.body.userId,
    });
    
    console.log("first", appliance);
      const savedAppliance = await appliance.save();
  
      res.json(savedAppliance);
  
};

// exports.createUser = async (req, res) => {
//   try {
//     // Create a new user instance
//     const user = new User({
//       email: "BIWA@GMAIL.COM",
//       name: "bhanuka",
//       phoneNumber: "0121345687",
//       isActive: "true",
//       createdOn: "",
//       country: "",
//       loginPassword: "",
//     });

//     // Save the user to the database
//     const savedUser = await user.save();

//     res.json(savedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// // }
