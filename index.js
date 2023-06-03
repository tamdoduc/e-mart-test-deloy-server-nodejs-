const express = require("express");
const app = express(); // notice that the app instance is called `app`, this is very important.

// no need for `app.listen()` on Deta, we run the app automatically.

const path = process.cwd() + "/.env";
const dotenv = require("dotenv").config({ path: path });
const mongoose = require("mongoose");
const cors = require("cors");

const accountRouter = require("./routes/account");
const productRouter = require("./routes/product");
const imageProductRouter = require("./routes/imageProduct");
const colorRouter = require("./routes/color");
const productInCartRouter = require("./routes/productInCart");
const productInFavorite = require("./routes/productInFavorite");
const discountCodeRouter = require("./routes/discountCode");
const evalutesRouter = require("./routes/evalute");
const billRouter = require("./routes/bill");
const productInBillRouter = require("./routes/productInBill");
const ConversationRouter = require("./routes/conversation");
const MessageRouter = require("./routes/message");

// console.log(process.env.DB_USERNAME);

app.get("/", (req, res) => {
  res.send("username: " + process.env.DB_USERNAME + "path: " + path);
});

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://turtle19520253:19520253@cluster0.rbbiuxh.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connecteddd");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
console.log(process.env.DB_USERNAME);
connectDB();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/accounts", accountRouter);
app.use("/api/products", productRouter);
app.use("/api/imageProducts", imageProductRouter);
app.use("/api/colors", colorRouter);
app.use("/api/productInCarts", productInCartRouter);
app.use("/api/productInFavorites", productInFavorite);
app.use("/api/discountCodes", discountCodeRouter);

app.use("/api/evalutes", evalutesRouter);
app.use("/api/bills", billRouter);
app.use("/api/productInBills", productInBillRouter);

app.use("/api/conversations", ConversationRouter);
app.use("/api/messages", MessageRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// // no need for `app.listen()` on Deta, we run the app automatically.
// module.exports = app; // make sure to export your `app` instance.
module.exports = app; // make sure to export your `app` instance.
