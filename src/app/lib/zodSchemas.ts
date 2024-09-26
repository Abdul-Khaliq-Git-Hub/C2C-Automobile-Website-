import { string, z } from "zod";

export const formDataSchema = z.object({
  Model: z.string(),
  Year: z.string().min(4).max(4, {
    message: "Please enter a valid year",
  }),
  Fuel: z.string({
    message: "Please select a Fuel Type",
  }),
  EngineType: z.string().min(1, {
    message: "Please enter Engine Type",
  }),
  CylinderType: z.string().min(1, {
    message: "Please enter Cylinder Type",
  }),
  Location: z.string({ message: "Please enter Location of the car" }),
  ConditionType: z.string({
    message: "Please select car condition",
  }),
  SeatType: z.string().min(1, {
    message: "Please enter Seat Type",
  }),
  Kilometer: z.string({
    message: "Please enter KM driven",
  }),
  Plate: z.string({ message: "Please enter a valid Number Plate" }),
  Price: z.string({ message: "Please enter your Price" }),
  Name: z.string({ message: "Please enter your name" }),
  Phone: z.string().min(10).max(10, {
    message: "Please enter a valid Phone Number",
  }),
});
