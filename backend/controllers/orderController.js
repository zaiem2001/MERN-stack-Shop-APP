const Order = require("../models/orderModel");
const expressAsyncHandler = require("express-async-handler");

const productController = {
  // --> Add new Order
  // --> POST /api/orders

  addNewOrder: expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice,
    } = req.body;

    if (!shippingAddress || !paymentMethod || !orderItems) {
      res.status(400);
      throw new Error("Some requierd Fields are empty");
    }

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No Order Found");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        itemsPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      return res.status(201).json(createdOrder);
    }
  }),

  // --> Get Order By Id
  // --> GET /api/orders/:id

  getOrderById: expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      res.status(404);
      throw new Error("Order Not Found.");
    }

    res.status(200).json(order);
  }),

  // --> update order to paid
  // --> PUT /api/orders/:id/pay

  updateOrderToPaid: expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order Not Found.");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }),

  // --> update order to delivered
  // --> PUT /api/orders/:id/deliver # protect/Admin

  updateOrderToDelivered: expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order Not Found.");
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }),

  // --> Get logged in user orders
  // --> GET /api/orders/myorders

  getUserOrders: expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
      res.status(404);
      throw new Error("Order Not Found.");
    }

    res.status(200).json(orders);
  }),

  // --> Get all orders
  // --> GET /api/orders only admins

  getOrders: expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "_id name");

    if (!orders) {
      res.status(404);
      throw new Error("Order Not Found.");
    }

    res.status(200).json(orders);
  }),
};

module.exports = productController;
