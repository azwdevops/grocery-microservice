import { CreateVendorInput } from "@/dto";
import { VendorModel } from "@/models";
import { GeneratePassword, GenerateSalt } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await VendorModel.findOne({ email });
  } else {
    return await VendorModel.findById(id);
  }
};

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;

  const existingVendor = await FindVendor("", email);
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

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
  const vendors = await VendorModel.find();
  if (vendors !== null) {
    return res.json(vendors);
  }
  return res.json({ message: "Vendors data not available" });
};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = req.params.id;

  const vendor = await FindVendor(vendorId);

  if (vendor !== null) {
    return res.json(vendor);
  }
  return res.json({ message: "Vendor not found" });
};
