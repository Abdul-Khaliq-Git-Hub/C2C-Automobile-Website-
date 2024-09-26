"use client";
import Language from "./language";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user] = useAuthState(auth);
  console.log("hi");
  return (
    <nav className={styles.navContainer}>
      <div className="pl-4">
        <Link href="/">
          <Image src={"/carshow.png"} alt="CarShow" width={60} height={60} />
        </Link>
      </div>
      <div className="ml-12">
        <ul className={styles.ulContainer}>
          <li>
            <Link className={styles.links} href="/">
              Home
            </Link>
          </li>
          <Link className={styles.links} href="/buy">
            <li>Buy</li>
          </Link>
          <Link className={styles.links} href="/sell">
            <li>Sell</li>
          </Link>
        </ul>
      </div>
      <div className={styles.langLoginContainer}>
        <div>
          <FontAwesomeIcon icon={faLanguage} size="2xl" />
          {/* <Language /> */}
        </div>
        {!user ? (
          <div className="flex text-center items-center">
            <div
              className="border-l border-gray-300 h-12 mx-2"
              role="separator"
            ></div>
            <div>
              <Link className={styles.links} href="/sign-in">
                <button className="border-none">Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div
              className="border-l border-gray-300 h-12 mx-2"
              role="separator"
            ></div>
            <button className="border-none" onClick={() => signOut(auth)}>
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
