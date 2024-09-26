import Image from "next/image";
import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer>
      <div className={`${styles.footerContainer} mt-8`}>
        <div className={styles.footerImgContainer}>
          <Image src="/carshow.png" alt="" width={60} height={100} />
          <p>Copyright © 2024. All Rights Reserved.</p>
        </div>
        <div className="">
          <p>USEFUL LINKS</p>
          <ul>
            <li>About us</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
