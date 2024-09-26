// src/app/components/CarSplide.tsx

import { storage } from "../../firebase/firebase"; // Adjust path as needed
import { getDownloadURL, ref } from "firebase/storage";
import ClientSplide from "./clientsplide";
import Image from "next/image";
import styles from "./carsplide.module.css";

interface CarSplideProps {
  pageDetails: {
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
  };
}

// Server-side fetch function
async function fetchImageUrls(pageDetails: CarSplideProps["pageDetails"]) {
  try {
    // Fetch image URLs from Firebase Storage
    const urls = await Promise.all(
      pageDetails.ImageNameArray.map(async (imageName) => {
        const imageRef = ref(
          storage,
          `images/${pageDetails.ImagesFileName}/${imageName}`
        );
        return await getDownloadURL(imageRef);
      })
    );
    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function CarSplide({ pageDetails }: CarSplideProps) {
  // Fetch image URLs server-side
  const imageUrls = await fetchImageUrls(pageDetails);

  return (
    <main>
      <section
        id="main-carousel"
        className={`splide ${styles.splide}`}
        aria-label="Car Gallery"
      >
        <div className="mb-2">
          <ClientSplide imageUrls={imageUrls} />
        </div>

        {/* <div className="splide__track">
          <ul className="splide__list">
            {imageUrls.map((url, index) => (
              <li className="splide__slide" key={index}>
                <Image
                  src={url}
                  alt={`Car ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "570px" }}
                />
              </li>
            ))}
          </ul>
        </div> */}
      </section>

      <ul id="thumbnails" className={styles.thumbnails}>
        {imageUrls.map((url, index) => (
          <li className={styles.thumbnail} key={index}>
            <Image
              src={url}
              alt={`Thumbnail ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "120px", height: "90px" }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
