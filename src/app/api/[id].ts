// pages/api/carDetails/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../firebase/firebase"; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";

interface CarDetails {
  Brand: string;
  Condition: string;
  CylinderType: string;
  EngineType: string;
  Fuel: string;
  ImageNameArray: string[];
  ImagesFileName: string;
  KilometerDriven: string;
  Location: string;
  Model: string;
  Phone: string;
  Plate: string;
  Price: string;
  SeatType: string;
  SellerName: string;
  Year: string;
  Transmission: string;
  Owner: string;
  Color: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the ID from the request query parameters
  const { id } = req.query;

  // Validate the ID
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing ID parameter." });
  }

  try {
    // Fetch the document from Firestore
    const docRef = doc(db, "carListings", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "No such document found." });
    }

    // Send the car details as JSON response
    const carDetails = docSnap.data() as CarDetails;
    return res.status(200).json(carDetails);
  } catch (error) {
    console.error("Error fetching car details:", error);
    return res.status(500).json({ error: "Failed to fetch car details." });
  }
}
