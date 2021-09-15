require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const errorMiddleware = require("./middleware/errorMiddleware");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
const uploadRoute = require("./routes/uploadRoutes");

const app = express();

app.use(express.json());

const MONGO_URL = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) => {
  res.status(200).json(process.env.PAYPAL_CLIENT_ID);
});

app.use("/uploads", express.static(__dirname + "/uploads"));

// FOR DEPLOYMENT PURPOSE.

if (process.env.ENV === "production") {
  // console.log(path.join(__dirname, "../frontend/build" + " --> 1st"));
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    // console.log(
    //   path.resolve(__dirname, "../", "frontend", "build", "index.html")
    // );
    return res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// ############################################

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
