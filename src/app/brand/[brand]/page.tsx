import { collection, getDocs, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase"; // Adjust path if necessary
import CarProduct from "../../components/carproduct"; // Adjust path if necessary

// Define the CarListing type (if not already done globally)
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

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const { brand } = params;
  const decodedBrand = decodeURIComponent(brand);
  // Firestore query to get car listings for the selected brand
  const q = query(
    collection(db, "carListings"),
    where("Brand", "==", decodedBrand)
  );
  const querySnapshot = await getDocs(q);

  // Map through the results and ensure correct typing
  const cars = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CarListing[];

  const carsWithImages = await Promise.all(
    cars.map(async (car) => {
      if (car.ImageNameArray.length > 0) {
        const imageRef = ref(
          storage,
          `images/${car.ImagesFileName}/${car.ImageNameArray[0]}`
        );
        try {
          const imageUrl = await getDownloadURL(imageRef);
          return { ...car, imageUrl }; // Attach the image URL to the car object
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return { ...car }; // Return the car object without the image URL if there's an error
        }
      }
      return { ...car }; // Return the car object without an image URL if there are no images
    })
  );
  return (
    <div>
      <h1>{decodedBrand} Cars</h1>
      {carsWithImages.length > 0 ? (
        carsWithImages.map((car) => (
          <CarProduct
            key={car.id}
            Brand={car.Brand}
            Engine={car.EngineType}
            Cylinder={car.CylinderType}
            Miles={car.KilometerDriven}
            Location={car.Location}
            Price={car.Price}
            Images={car.imageUrl || ""}
          />
        ))
      ) : (
        <p>No cars found for {brand}</p>
      )}
    </div>
  );
}
