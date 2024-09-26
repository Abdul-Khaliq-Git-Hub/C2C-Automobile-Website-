"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./cardetails.module.css";

interface CarDetailsProps {
  PhoneNumber: {
    Phone: string;
  };
}
export default function WhatsAppBtn(PhoneNumber: CarDetailsProps) {
  const [showNumber, setShowNumber] = useState(false); // Initially show "Show Number"

  const handleClick = () => {
    if (PhoneNumber?.PhoneNumber?.Phone) {
      setShowNumber(true); // Change button text to the number
    }
  };

  return (
    <>
      <button
        className={`${styles.phoneBtn} flex items-center gap-2 p-4`}
        onClick={handleClick}
      >
        <Image src="/phoneLogo.png" width={25} height={25} alt="" />
        {showNumber ? PhoneNumber.PhoneNumber.Phone : "Show Number"}
      </button>
      <button
        className={`${styles.whatsAppBtn} flex items-center gap-2`}
        onClick={() => {
          window.open(`https://wa.me/91${PhoneNumber.PhoneNumber.Phone}?text=Hello%20I%20am%20interested%20in%20your%20car,
                "_blank"`);
        }}
      >
        <Image src="/whatsapplogo.png" width={25} height={25} alt="" />
        WhatsApp
      </button>
    </>
  );
}
