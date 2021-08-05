require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db/index");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const fileUpload = require("express-fileupload");
const uploadRouter = require("./routes/upload");
const productRouter = require("./routes/productRouter");
const paymentRouter = require("./routes/paymentRouter");
//connect database

db.connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", productRouter);
app.use("/api", paymentRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
