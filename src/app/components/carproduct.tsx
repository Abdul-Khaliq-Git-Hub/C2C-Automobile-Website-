import styles from "./carproduct.module.css";
import Image from "next/image";

interface CarProductProps {
  Brand: string;
  Engine: string;
  Cylinder: string;
  Miles: number;
  Location: string;
  Price: string;
  Images: string;
}
export default function CarProduct(props: CarProductProps) {
  return (
    <div className={styles.carProductCard}>
      <Image
        src={props.Images}
        alt="carImage"
        width={0}
        height={0}
        sizes="100vw"
        className={styles.carProductImage}
        style={{
          width: "100%",
          height: "250px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      />
      <div className={styles.carDetailsContainer}>
        <h5 className={styles.cardTitle}>{props.Brand}</h5>
        <div className={styles.iconContainer}>
          <div>
            <div className="icon d-flex align-items-center justify-content-center">
              <Image
                src="/engine.png"
                alt="Engine Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p>Engine, {props.Engine} </p>
          </div>
          <div>
            <div className="icon d-flex align-items-center justify-content-center">
              <Image
                src="/cylinder.png"
                alt="Piston Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p>{props.Cylinder} Cylinder</p>
          </div>
          <div>
            <div className="icon d-flex align-items-center justify-content-center">
              <Image
                src="/odometer.png"
                alt="Odometer Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p>{props.Miles} mile</p>
          </div>
        </div>
      </div>
      <div className={styles.locationContainer}>
        <p>{props.Location}</p>
        <p>${props.Price}</p>
      </div>
    </div>
  );
}
