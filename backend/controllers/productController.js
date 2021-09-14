const Product = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");

const productController = {
  // --> get all products
  // --> GET /api/products

  getProducts: expressAsyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  }),

  // --> get single product with help of Id.
  // --> GET /api/products/:id

  getProductById: expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("no product found in the database.");
    }

    return res.status(200).json(product);
  }),

  // --> Delete a product.
  // --> DELETE /api/products/:id # ONLY ADMINS.

  deleteProductById: expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("no product found in the database.");
    } else {
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "Product deleted successfully" });
    }
  }),

  // --> Create a product.
  // --> POST /api/products # ONLY ADMINS.

  createProduct: expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  }),

  // --> Update a product.
  // --> PUT /api/products/:id # ONLY ADMINS.

  updateProduct: expressAsyncHandler(async (req, res) => {
    const { name, brand, price, description, image, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("product not found.");
    } else {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image || "/images/sample.jpg";
      product.category = category || "Sample";
      product.brand = brand;
      product.countInStock = countInStock || 0;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    }
  }),

  // review a product
  // POST /api/products/:id/reviews # private

  reviewProduct: expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      res.status(404);
      throw new Error("please enter a review.");
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("No product found");
    }

    const alreadyReviewed = product.reviews?.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Product reviewed successfully." });
  }),

  // Get top rated products.
  // GET /api/products/top

  topProducts: expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);

    if (!products) {
      res.status(404);
      throw new Error("No product found in the database.");
    }

    res.status(200).json(products);
  }),
};

module.exports = productController;
