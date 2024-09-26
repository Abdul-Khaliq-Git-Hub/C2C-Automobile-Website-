// src/app/carlisting/page.tsx
import DeleteBtn from "../components/DeleteBtn";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import CarProduct from "../components/carproduct";
import styles from "./carlisting.module.css";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";

// Font configuration
const edu = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["500"],
});

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

/// Server-side fetch function to get car listings and image URLs
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
      if (car.ImageNameArray.length > 0) {
        const imageRef = ref(
          storage,
          `images/${car.ImagesFileName}/${car.ImageNameArray[0]}`
        );
        try {
          const imageUrl = await getDownloadURL(imageRef);
          return { ...car, imageUrl };
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
      return { ...car };
    })
  );

  return carsWithImages;
}
export default async function CarListing() {
  // Fetch data server-side
  const carListings = await fetchCarListings();
  // Map car data to CarProduct components
  const carProduct = carListings.map((car) => (
    <div key={car.id}>
      <Link className={styles.links} href={`/car/${car.id}`} passHref>
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
      <DeleteBtn
        DeleteId={car.id}
        ImagesFileName={car.ImagesFileName}
        ImageNameArray={car.ImageNameArray}
      />
    </div>
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
