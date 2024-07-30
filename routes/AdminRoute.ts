import { CreateVendor, GetVendorById, GetVendors } from "@/controllers";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendors", GetVendors);
router.get("/vendor/:id", GetVendorById);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  return res.send({ message: "Hello from admin" });
});

export { router as AdminRoute };
