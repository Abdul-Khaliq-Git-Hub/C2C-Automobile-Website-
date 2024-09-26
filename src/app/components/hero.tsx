import React from "react";
import Image from "next/image";
import styles from "./hero.module.css";
import Link from "next/link";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";

const edu = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["500"],
});

function Hero() {
  return (
    <main>
      <div className={styles.carTextContainer}>
        <div>
          <h1 className={edu.className}>Find Your next match.</h1>
          <p>Find the right price, dealer and advice</p>
          <Link href="/car">
            <button>Book Now</button>
          </Link>
        </div>
      </div>
      <div className={styles.carContainerImg}>
        <Image
          src="/truck.png"
          alt="car"
          width={0}
          height={0}
          sizes="100vw"
          quality="100"
          style={{ width: "700px", height: "450px" }}
        />
      </div>
      <div>
        <Image
          src="/Pasted image.png"
          alt=""
          width={0}
          height={200}
          sizes="100vw"
          style={{ width: "100%" }}
        />
      </div>
    </main>
  );
}

export default Hero;
