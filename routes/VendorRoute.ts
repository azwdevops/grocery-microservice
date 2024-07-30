import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Hello from vendor" });
});

export { router as VendorRoute };
