import Image from "next/image";
import styles from "./search.module.css";
import Truck from "../lib/trucktypes";
import Brand from "../lib/brandlogos";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import Link from "next/link";

const edu = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Search() {
  return (
    <section>
      <div className={styles.searchBarContainer}>
        <div className={styles.findYourCarContainer}>
          <p className={edu.className}>Find Your Match</p>
          <hr />
        </div>
        <div className={`${styles.searchCarContainer} p-4`}>
          <h3 className="p-4 text-white">Popular Brands</h3>
          <div className="mb-8 grid grid-cols-5 gap-4">
            {Brand.map((brand) => {
              return (
                <Link
                  key={brand.name}
                  className={styles.links}
                  href={`/brand/${encodeURIComponent(brand.name)}`} // Dynamically route to brand page
                  passHref
                >
                  <div className="flex items-center justify-evenly flex-wrap flex-column">
                    <div className="flex items-center h-[100px]">
                      <Image
                        src={brand.logo}
                        width={100}
                        height={100}
                        alt="Brand"
                      />
                    </div>
                    <div className="text-center">{brand.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <hr />
          <div className="grid grid-cols-5 gap-4">
            {Truck.map((truck) => {
              return (
                <Link
                  key={truck.name}
                  className={styles.links}
                  href={`/truck/${encodeURIComponent(truck.name)}`}
                  passHref
                >
                  <div className="flex items-center text-center justify-evenly flex-wrap flex-column">
                    <div className="flex items-center h-[100px]">
                      <Image
                        src={truck.logo}
                        width={100}
                        height={100}
                        alt="Brand"
                      />
                    </div>
                    <div className="text-center">{truck.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
