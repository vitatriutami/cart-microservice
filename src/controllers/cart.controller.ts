import type { Request, Response } from "express";
import { Data } from "./data";

// interface ICart {
//   id?: string;
//   quantity: string;
//   userId: string;
//   product: {
//     id?: string;
//     name: string;
//     description: string;
//   };
// }

let carts: any = [];

const cartController = {
  
  // READ
  handleGetAllCart: async (req: Request, res: Response) => {
    const carts = Data.carts;
    res.send(carts);
  },
  handleGetCartById: async (req: Request, res: Response) => {
    const cartId = req.params.id

    // const cart = Data.carts.find((cart));
    try {
      const cart = await Data.carts.find((cart) => cart.id === cartId)
      if (!cart) {
        return res.status(401).json("No cart is found");
      }
      res.status(201).json(cart);
    } catch (error) {
      res.status(401).json("No cart is found");
    }
  },

  // CREATE
  handleAddProductToCart: async (req: Request, res: Response) => {
    res.send(`Cart was added!`);
  },
  // handleRemoveProductToCart: async (req: Request, res: Response) => {
  //   const id = req.params.id;

  //   carts = carts.filter((cart) => cart.id != id);

  //   res.status(201).json("Product was removed from Cart!");
  // },
};

export default cartController;
