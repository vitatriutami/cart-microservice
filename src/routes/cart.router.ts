import express from "express";
import cartController from "../controllers/cart.controller";
export const cartRouter = express();

// Routes
cartRouter.get("/", cartController.handleGetAllCartItem);
cartRouter.get("/:id", cartController.handleGetCartItem);
cartRouter.post("/", cartController.handleAddCartItem); // add product to cart
cartRouter.delete("/:id", cartController.handleRemoveCartItem); // remove product to cart
cartRouter.patch("/:id", cartController.handleUpdateCartItem); 

export default cartRouter;
