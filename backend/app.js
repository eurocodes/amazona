import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import data from './data';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(`mongodb+srv://iamugo:${config.DB_PASSWORD}@cluster0.o8iyi.gcp.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Successfully connected to Mongodb Atlas")
    })
    .catch(error => console.log("Error occoured", error.reason));

// mongoose.connect(mongodbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// })
//     .then(() => {
//         console.log("Connected to mongodb")
//     })
//     .catch(error => console.log("Error occoured", error.reason));

const app = express();
app.use(bodyParser.json());

app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
});
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// })

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(item => item._id === productId);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: "Product Not Found" })
//     }
// })

app.listen(5000, () => { console.log('Server started at http://localhost:5000') })