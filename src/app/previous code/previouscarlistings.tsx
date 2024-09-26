"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import styles from "./carlisting.module.css";
import CarProduct from "../components/carproduct";
import Link from "next/link";

const edu = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["500"],
});

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

export default function CarListing() {
  const [carListings, setCarListings] = useState<CarListing[]>([]);

  useEffect(() => {
    const fetchCarListings = async () => {
      const querySnapshot = await getDocs(collection(db, "carListings"));
      const cars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CarListing[];

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

      setCarListings(carsWithImages);
    };
    fetchCarListings();
  }, []);

  console.log(carListings);
  const carProduct = carListings.map((car) => (
    <Link
      className={styles.links}
      key={car.id}
      href={`/car/${car.id}`}
      passHref
    >
      <CarProduct
        Brand={car.Brand}
        Engine={car.EngineType}
        Cylinder={car.CylinderType}
        Miles={car.KilometerDriven}
        Location={car.Location}
        Price={car.Price}
        Images={car.imageUrl || ""}
      />
    </Link>
  ));

  return (
    <main>
      <div className={`${styles.featuredListingText} text-center mt-8 mb-8`}>
        <h1 className={edu.className}>Featured Listings</h1>
      </div>
      <div className={styles.carListingContainer}>{carProduct}</div>
    </main>
  );
}
