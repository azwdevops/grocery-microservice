import "module-alias/register";
import express from "express";
import { AdminRoute, VendorRoute } from "@/routes";
import mongoose from "mongoose";
import { MONGO_URI } from "@/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.clear();
      console.log("DB Connected and listening on port 5000");
    });
  })
  .catch((err) => console.log("error" + err));
