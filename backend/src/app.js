require("dotenv").config();
const express = require("express");
const multer = require("multer");
const route = require("./server/routes/restaurant.routes");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./server/routes/user.routes");
const authRoutes = require("./server/routes/auth.routes");
const connectDB = require("./database/db");
const orderRoutes = require("./server/routes/order.routes");
const productRoutes = require("./server/routes/product.routes");
const cartRoutes = require("./server/routes/cart.routes")
const restaurantRoutes = require("./server/routes/restaurant.routes")

const app = express();

// Connect to MongoDB
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "System is healthy" });
});

app.use(route);
app.use(
  "/Products_Images",
  express.static(path.join(__dirname, "Products_Images"))
);
app.use("/User_Images", express.static(path.join(__dirname, "User_Images")));

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/restaurants', restaurantRoutes)
app.use('/api/v1/carts', cartRoutes)

const { lookup } = require("dns").promises;
const os = require("os");

const PORT = process.env.PORT || 2300;
app.enable("trust proxy");

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred during file upload
    console.log(err.code);
    if (err.code == "LIMIT_UNEXPECTED_FILE") {
      res
        .status(406)
        .json({ Message: "Maximum number of pictures you upload is 3" });
    } else {
      console.log(err.message);
      res.status(406).json({ Message: err.message });
    }
  } else {
    // For other errors, or if the error is not from Multer
    console.log(err);
    res.status(500).json({ Message: err.message });
  }
});
app.use((err, req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.listen(PORT, async (req, res) => {
  const IP = (await lookup(os.hostname())).address;
  // await db['postgres'].sync()
  console.log(
    `Server started at ${
      process.env.NODE_ENV === "development" ? "http" : "https"
    }://${IP}:${PORT}`
  );
});

module.exports = app;
