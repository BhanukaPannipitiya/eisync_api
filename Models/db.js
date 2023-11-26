const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Default is 10000 (10 seconds)
  socketTimeoutMS: 45000,         // Default is 45000 (45 seconds)
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

// const db = mongoose.connection;
