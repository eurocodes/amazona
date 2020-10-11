import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, require: true },
    postalCode: { type: String, require: true },
    country: { type: String, require: true },
};

const paymentSchema = {
    paymentMethod: { type: String, required: true },
};

const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
});

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, },
}, {
    timestamps: true,
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;