// src/app/car/[id]/page.tsx

import { db } from "../../firebase/firebase"; // Adjust path based on your folder structure
import { doc, getDoc } from "firebase/firestore";
import CarDetails from "../components/cardetails";
import "@splidejs/splide/dist/css/splide.min.css";

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

const CarDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch data directly within the server component
  const fetchCarDetails = async (id: string): Promise<CarDetails | null> => {
    try {
      const docRef = doc(db, "carListings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as CarDetails;
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      return null;
    }
  };

  const carDetails = await fetchCarDetails(id);
  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return <CarDetails pageDetails={carDetails} />;
};

export default CarDetailsPage;
