import { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import styles from "./carsplide.module.css";
import Image from "next/image";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

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

export default function CarSplide({ pageDetails }: CarSplideProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const splideRef = useRef<HTMLDivElement>(null);
  const splideInstance = useRef<Splide | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await Promise.all(
          pageDetails.ImageNameArray.map(async (imageName) => {
            const imageRef = ref(
              storage,
              `images/${pageDetails.ImagesFileName}/${imageName}`
            );
            return await getDownloadURL(imageRef);
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (splideRef.current && imageUrls.length > 0) {
      const splide = new Splide(splideRef.current, {
        pagination: false,
        arrows: true,
      }).mount();

      splideInstance.current = splide;

      const thumbnails = document.getElementsByClassName("thumbnail");
      let current: HTMLElement | null = null;

      const initThumbnail = (thumbnail: Element, index: number) => {
        thumbnail.addEventListener("click", function () {
          splide.go(index);
        });
      };

      for (let i = 0; i < thumbnails.length; i++) {
        initThumbnail(thumbnails[i], i);
      }

      splide.on("mounted move", function () {
        const thumbnail = thumbnails[splide.index] as HTMLElement;

        if (thumbnail) {
          if (current) {
            current.classList.remove("is-active");
          }

          thumbnail.classList.add("is-active");
          current = thumbnail;
        }
      });

      return () => {
        splide.destroy();
      };
    }
  }, [imageUrls]);

  return (
    <main>
      <section
        id="main-carousel"
        className={`splide ${styles.splide}`}
        ref={splideRef}
        aria-label="My Awesome Gallery"
      >
        <div className="splide__track">
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
        </div>
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
