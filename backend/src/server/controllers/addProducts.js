const Product = require("../../models/product");
const Restaurant =  require( "../../models/restaurant") ;
const fs = require("fs").promises;

const uploadItem = async (req, res) => {
  const userRole = req.user.role;
  const productPics = req.files;
//   const restaurantId = req.user._id;
//   const regNo = req.user.registrationNo;
  const { productName, description, price, minimumPrice, restaurant} = req.body;

  if (userRole !== "restaurant" ) {
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this action" });
  }

  try {
    const prodPics = productPics.map((file) => file.path);

    let isRestaurantRegister= await Restaurant.findOne({ name : restaurant});

    if(!isRestaurantRegister)
    return res.status(422).json({ message: "Restaurant not found" });

   

    const product = new Product({
      restaurant: isRestaurantRegister._id,
      name: productName,
      description: description,
      price: price,
      productPictures: [],
      minimumPrice
    });

    const newProduct = await product.save();

    if (newProduct) {
      await Product.findByIdAndUpdate(
        { _id: newProduct._id },
        { $push: { productPictures: { $each: prodPics } } },
        { new: true }
      );
    }

    return res.status(201).json({ message: "Product uploaded successfully" });
  } catch (error) {
    // Delete uploaded files in case of error
    productPics.forEach(async (file) => {
      await fs.unlink(file.path);
    });

    console.error(`Error uploading product: ${error}`);
    return res.status(500).json({ message: "Failed to upload product" });
  }
};

module.exports = uploadItem;
