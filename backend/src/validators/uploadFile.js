const multer = require("multer");
// const path = require("path");

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./User_Images");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const ProductsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Products_Images");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const itemsStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./Items_Images");
//   },

//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const upload = multer({ storage: userStorage });
const uploadProducts = multer({
  storage: ProductsStorage,
});

// const uploadItems = multer({
//   storage: itemsStorage,
// });
module.exports = { upload, uploadProducts};
// module.exports = { upload, uploadHostels, uploadItems };
