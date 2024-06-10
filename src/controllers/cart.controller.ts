import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Data } from "./data";

// interface ICart {
//   id?: any | string;
//   userId: string;
//   productId: string;
// }

let carts: any = [];

const updateData = () => {
  try {
    delete require.cache[require.resolve("./data")]; // Clear cache to force re-import
    console.log("Data updated at: ", new Date());
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
// Call updateData initially and then every 4 minutes
updateData(); // Initial update
const interval = setInterval(updateData, 4 * 60 * 1000);

const cartController = {
  // READ
  handleGetAllCartItem: async (req: Request, res: Response) => {
    const carts = Data.carts;
    res.send(carts);
  },
  handleGetCartItem: async (req: Request, res: Response) => {
    const cartId = req.params.id;
    try {
      const cart = await Data.carts.find((cart) => cart.id === cartId);
      if (!cart) {
        return res.status(401).json("No cart item is found");
      }
      res.status(201).json(cart);
    } catch (error) {
      res.status(401).json("No cart item is found");
    }
  },

  // CREATE
  handleAddCartItem: async (req: Request, res: Response) => {
    const newCart = req.body;
    const newCartId = uuidv4().toString();
    newCart.id = newCartId;

    Data.carts.push(newCart);
    res.send({ message: "Product just added to cart!", cart: newCart });
  },

  // DELETE
  handleRemoveCartItem: async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const foundId = Data.carts.findIndex((cart: any) => cart.id === cartId);
    if (foundId !== -1) {
      const deletedCart = Data.carts.splice(foundId, 1)[0];
      res.send({
        message: `Product with cartId ${cartId} has been removed from cart!`,
        deletedCart,
      });
    } else {
      res.status(404).send({ message: "Cart item not found!" });
    }
  },

  // UPDATE
  handleUpdateCartItem: async (req: Request, res: Response) => {
  const cartId = req.params.id;
  const foundId = Data.carts.findIndex((cart) => cart.id === cartId);
  if (foundId !== -1) {
    const updatedCart = { ...req.body, id: cartId };
    Data.carts[foundId] = updatedCart;
    res.send({
      message: `Cart item with cartId ${cartId} has been updated`,
      updatedCart,
    });
  } else {
    res.status(404).send({ message: "Cart item not found!" });
  }
  },
};

export default cartController;
