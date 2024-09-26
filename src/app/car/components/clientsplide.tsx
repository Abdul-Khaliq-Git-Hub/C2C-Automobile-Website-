// src/app/components/ClientSplide.tsx
"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import Image from "next/image";

interface CarSplideProps {
  imageUrls: string[];
}

export default function ClientSplide(props: CarSplideProps) {
  const splideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the ref and necessary elements are present before initializing
    if (
      splideRef.current &&
      splideRef.current.querySelector(".splide__track") &&
      splideRef.current.querySelector(".splide__list")
    ) {
      // Initialize Splide
      const splide = new Splide(splideRef.current, {
        pagination: false,
        arrows: true,
        type: "loop", // Add any other necessary options
      });

      splide.mount();

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
    } else {
      console.error("Splide elements are missing.");
    }
  }, [splideRef]);

  // Include the correct splide elements in the ref
  return (
    <div ref={splideRef} className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          {/* Splide items should go here, ensure the structure matches */}
          {props.imageUrls.map((url, index) => (
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
    </div>
  );
}
