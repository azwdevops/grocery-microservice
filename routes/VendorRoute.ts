import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from "@/controllers";
import { Authenticate } from "@/middlewares";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Hello from vendor" });
});

export { router as VendorRoute };
