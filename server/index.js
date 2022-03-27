import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.config.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import userRouter from "./src/routes/user.route.js";
import categoryRouter from "./src/routes/category.route.js";
import productRouter from "./src/routes/product.route.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const port = process.env.PORT || 5000;

dotenv.config();
// database connection initialized
connectDB();

const app = express();
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
  })
);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 1000000,
    extended: false,
  })
);

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

// app.use(errorHandler);

app.listen(5000, () => console.log(`serever running on port ${port}`));
