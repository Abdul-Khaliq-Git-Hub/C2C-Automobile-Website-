// src/pages/api/carlistings.ts
import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

// Define the type for car listings
type CarListing = {
  id: string;
  ImagesFileName: string;
  Brand: string;
  EngineType: string;
  CylinderType: string;
  KilometerDriven: number;
  Location: string;
  Price: string;
  ImageNameArray: string[];
  imageUrl?: string;
};

// Fetch car listings and image URLs
async function fetchCarListings() {
  const querySnapshot = await getDocs(collection(db, "carListings"));

  // Map through each document and format the data
  const cars = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CarListing[];

  // Fetch image URLs for each car
  const carsWithImages = await Promise.all(
    cars.map(async (car) => {
      try {
        if (car.ImageNameArray.length > 0) {
          const imageRef = ref(
            storage,
            `images/${car.ImagesFileName}/${car.ImageNameArray[0]}`
          );
          const imageUrl = await getDownloadURL(imageRef);
          return { ...car, imageUrl };
        } else {
          return { ...car };
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
        return { ...car };
      }
    })
  );

  return carsWithImages;
}

// Handle the API request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cars = await fetchCarListings();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car listings" });
  }
}
