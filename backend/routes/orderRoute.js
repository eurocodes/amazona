import express from 'express';
import { isAdmin, isAuth } from '../utils';
import Order from '../models/orderModel';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
});

router.get("/mine", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: "Order not found" });
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        const deletedOrder = await order.remove();
        res.send(deletedOrder);
    } else {
        res.status(404).send({ message: "order not found" })
    }
});

router.post("/", isAuth, async (req, res) => {
    const { orderItems, shipping, payment, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const newOrder = new Order({
        orderItems,
        user: req.user._id,
        shipping, payment, itemsPrice, taxPrice, shippingPrice, totalPrice
    });
    const newCreadtedOrder = await newOrder.save();
    res.status(201).send({ message: "New Order Created", data: newCreadtedOrder })
});

router.put("/:id/pay", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: "paypal",
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.payment,
            }
        }
        const updatedOrder = await order.save();
        res.send({ message: "Order Paid.", order: updatedOrder });
    } else {
        res.status(404).send({ message: "Order not found" })
    }
})

export default router;