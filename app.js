const express = require("express");
require("dotenv").config();
require("./Models/db");
const cors = require("cors");
const userRouter = require("./Routes/userRoute");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Use the router you've required
// app.use('/addAppliance', addApplinceRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
