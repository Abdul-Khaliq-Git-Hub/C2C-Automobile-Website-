import Image from "next/image";
import styles from "./icondetails.module.css";

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
export default function IconDetails({ pageDetails }: CarSplideProps) {
  return (
    <>
      <div className={styles.iconContainer}>
        <div className="flex justify-between p-8">
          <div className="w-[80px] items-center">
            <div className="flex items-center justify-center">
              <Image
                src="/engine.png"
                alt="Engine Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p className="flex justify-center">
              Engine, {pageDetails.EngineType}{" "}
            </p>
          </div>
          <div>
            <div className=" w-[80px] flex items-center justify-center">
              <Image
                src="/cylinder.png"
                alt="Piston Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p className="flex justify-center">
              {" "}
              Cylinder {pageDetails.CylinderType}
            </p>
          </div>
          <div>
            <div className=" w-[80px] flex items-center justify-center">
              <Image
                src="/odometer.png"
                alt="Piston Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p className="flex justify-center">{pageDetails.KilometerDriven}</p>
          </div>
        </div>
        <div className="flex justify-between p-8">
          <div>
            <div className="w-[80px] flex items-center justify-center">
              <Image
                src="/gaspump.png"
                alt="Odometer Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p className="flex justify-center"> {pageDetails.Fuel}</p>
          </div>

          <div>
            <div className="w-[80px] flex items-center justify-center">
              <Image
                src="/Globe.png"
                alt="Odometer Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <p className="flex justify-center">{pageDetails.Location}</p>
          </div>
          <div>
            <div className="w-[80px] flex items-center justify-center">
              <Image
                src="/transmission.png"
                alt="Odometer Icon"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "45px", height: "45px" }}
              />
            </div>
            <p className="flex justify-center">{pageDetails.Transmission}</p>
          </div>
        </div>
      </div>
    </>
  );
}
