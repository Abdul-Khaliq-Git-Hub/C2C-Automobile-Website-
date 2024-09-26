import styles from "./cardetails.module.css";
import Image from "next/image";
import CarSplide from "./carsplide";
import IconDetails from "./icondetails";
import SellerDetailsBtn from "./SellerDetailsBtn";

interface CarDetailsProps {
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
    Color: string;
    Owner: string;
  };
}

const CarDetails: React.FC<CarDetailsProps> = ({ pageDetails }) => {
  return (
    <main>
      <div className={styles.carDetailsPage}>
        <div className={styles.carDetailsContainer}>
          <div className={styles.splideContainer}>
            <CarSplide pageDetails={pageDetails} />
          </div>
          <div className={styles.carDetails}>
            <div className={styles.carMakeContainer}>
              <div>
                <h3 className="text-3xl font-bold">
                  {pageDetails.Brand} {pageDetails.Model}
                </h3>
                <div className="flex">
                  <Image src="/locationpin.png" width={20} height={16} alt="" />
                  {pageDetails.Location}
                </div>
              </div>
              <p>${pageDetails.Price}</p>
            </div>

            <div>
              <IconDetails pageDetails={pageDetails} />
            </div>
            <div className={styles.iconContainer}></div>
            <div className={styles.paintContainer}>
              <p>Owner</p>
              <div className="text-end">
                <p>{pageDetails.Owner}</p>
              </div>
            </div>
            <div className={styles.plateContainer}>
              <p>Plate</p>
              <p>{pageDetails.Plate}</p>
            </div>
            <div className={styles.seatNumberContainer}>
              <p>Seat Number</p>
              <p>{pageDetails.SeatType}</p>
            </div>
            {/* <div className={styles.seatMaterialContainer}>
              <p>Seat material</p>
              <p>Fabric</p>
            </div> */}
            <div className={styles.ColorContainer}>
              <p>Color</p>
              <p>{pageDetails.Color}</p>
            </div>
            <div className={styles.conditionContainer}>
              <p>Condition</p>
              <p>{pageDetails.Condition}</p>
            </div>
            <div className={styles.otherSpecContainer}></div>
          </div>
        </div>
        <div className={styles.sellerDetailsContainer}>
          <div>
            <Image src="/defaultPic.png" width={450} height={450} alt="" />
          </div>
          <div className={styles.sellerDetails}>
            <h2>{pageDetails.SellerName}</h2>
            <p>Location</p>
          </div>
          <div className={styles.btnContainer}>
            <SellerDetailsBtn PhoneNumber={pageDetails} />
            <button className={styles.vinBtn}>Show VIN</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetails;
