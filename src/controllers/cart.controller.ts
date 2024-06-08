import type { Request, Response } from "express";

interface ICart {
  id?: string;
  quantity: string;
  userId: string;
  product: {
    id?: string;
    name: string;
    description: string;
  };
}

let carts: ICart[] = [];

const cartController = {
  handleGetAllCart: async (req: Request, res: Response) => {
    res.send(carts);
  },

  handleAddProductToCart: async (req: Request, res: Response) => {
    res.send(`Cart was added!`);
  },
  handleRemoveProductToCart: async (req: Request, res: Response) => {
    const id = req.params.id;

    carts = carts.filter((cart) => cart.id != id);

    res.status(201).json("Product was removed from Cart!");
  },
};

export default cartController;
