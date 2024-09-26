"use client";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";

interface CarProductProps {
  DeleteId: string;
  ImagesFileName: string;
  ImageNameArray: string[];
}
export default function CarProduct(props: CarProductProps) {
  const handleDeleteCarProduct = async () => {
    try {
      // Deleting the document from Firestore
      const docRef = doc(db, "carListings", props.DeleteId);
      await deleteDoc(docRef);

      // Deleting the image from Firebase Storage
      props.ImageNameArray.map(async (imageName) => {
        const imageRef = ref(
          storage,
          `images/${props.ImagesFileName}/${imageName}`
        );
        await deleteObject(imageRef);
      });

      console.log("Car product and image successfully deleted.");
    } catch (error) {
      console.error("Error deleting car product or image: ", error);
    }
  };

  return (
    <button
      className="w-full border-none bg-red-500 text-white rounded-bl-[15px] rounded-br-[15px]"
      onClick={handleDeleteCarProduct}
    >
      Delete
    </button>
  );
}
