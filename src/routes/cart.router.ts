import express from "express";
import cartController from "../controllers/cart.controller";
export const cartRouter = express();

// Routes
cartRouter.get("/", cartController.handleGetAllCart);
// cartRouter.get("/:id", cartController.handleGetAllCart);
cartRouter.post("/:id", cartController.handleAddProductToCart); // add product to cart
// cartRoute.put("/cart:id", cartController.handleUpdateCart); // add change product quantity ??
cartRouter.delete("/:id", cartController.handleRemoveProductToCart); // remove product to cart

export default cartRouter;
