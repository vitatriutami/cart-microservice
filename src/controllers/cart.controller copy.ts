import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Data } from "./data";
// import faker from "@faker-js/faker";

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
        return res.status(401).json("No cart is found");
      }
      res.status(201).json(cart);
    } catch (error) {
      res.status(401).json("No cart is found");
    }
  },

  // CREATE
  handleAddCartItem: async (req: Request, res: Response) => {
    const newCart = req.body;
    const newCartId = uuidv4().toString();
    newCart.id = newCartId;

    Data.carts.push(newCart);
    res.send({ message: "Cart Created!", cart: newCart });
  },

  // CREATE
  // handleAddCartItem: async (req: Request, res: Response) => {
  //   const newCart = req.body;
  //   // const newCartId = uuidv4();
  //   // newCart.id = newCartId;
  //     // carts.push({ ...cart, id: uuidv4() });

  //   Data.carts.push(...newCart, id: uuidv4());
  //   res.send({ message: "A cart was created" });
  // },

  // handleAddCartItem: async (req: Request, res: Response) => {
  //   const newCart = req.body;
  //   const newCartId = Math.floor(100000 + Math.random() * 900000).toString();
  //   newCart.id = newCartId;

  //   // Temporarily add new job to jsonData
  //   Data.carts.push(newCart);
  //   res.send({ success: true, msg: "Job Created Successfully!" });

  //   // const cart = req.body;
  //   // // // const cart = {userId, productId};
  //   // // const Id = uuidv4();
  //   // Data.carts.push({ ...cart });
  //   // res.status(201).json({ message: "Cart with was added" });
  // },

  // handleAddCartItem: async (req: Request, res: Response) => {
  //   try {
  //     const cart = req.body;
  //     const Id = uuidv4();
  //     // carts.push({ ...cart, id: Id });
  //     return res.status(201).json({ message: "Cart was added", data: cart });
  //   } catch (err: any) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },

  // DELETE
  handleRemoveCartItem: async (req: Request, res: Response) => {
    const cartId = req.params.id;
    carts = Data.carts.filter((cart: any) => cart.id != cartId);
    if (!carts) {
      return res.status(404).json({ message: "cart not found" });
    }
    res
      .status(201)
      .json(`Product with cart Id ${cartId} was removed from Cart!`);
  },

  // handleRemoveCartItem: async (req: Request, res: Response) => {
  //   let found = Data.carts.find(function (cart) {
  //     return cart.id === req.params.id
  //   })
  //   if (found) {
  //     let targetIndex = Data.carts.indexOf(found)
  //     res.status(201).json(`Product with ${targetIndex} was removed from Cart!`);
  //   }
  //   else {
  //     res.send(401).json("Cannot delete")
  //   }
  // },

  // UPDATE
  handleUpdateCartItem: async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const { userId, productId } = req.body;

    const cart = Data.carts.find((cart: any) => cart.id === cartId);

    if (userId) carts.userId = userId;
    if (productId) carts.productId = productId;

    res.status(201).json(`Product with cart Id ${cartId} was updated!`);
  },
};

export default cartController;
