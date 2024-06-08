import express from "express";
import cors from "cors";
import cartRouter from "./routes/cart.router";

const port = process.env.PORT || 8005;
const app = express();

app.use(cors());
app.use(express());

app.use("/carts", cartRouter);
app.listen(port, () => console.log(`server is running on ${port}`));
