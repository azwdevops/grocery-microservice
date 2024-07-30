import { CreateVendorInput } from "@/dto";
import { VendorModel } from "@/models";
import { GeneratePassword, GenerateSalt } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;
  const existingVendor = await VendorModel.findOne({ email });
  if (existingVendor !== null) {
    return res.status(400).json({ message: "Vendor with this email already exists" });
  }

  const salt = await GenerateSalt();
  const hashedPassword = await GeneratePassword(password, salt);

  const createdVendor = await VendorModel.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password: hashedPassword,
    salt,
    ownerName,
    phone,
    rating: 0,
    serviceAvailability: false,
    coverImages: [],
  });
  return res.json(createdVendor);
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {};
