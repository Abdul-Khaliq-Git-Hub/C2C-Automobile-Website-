"use client";
import LoginPrompt from "@/app/components/LoginPrompt";
import React, { useEffect, useState } from "react";
import styles from "./CarDetailsForm.module.css";
import brandTypes from "../carbrandstypes";
import trucktypes from "../trucktypes";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function CarDetailsForm() {
  const [user] = useAuthState(auth);

  const [imagesArray, setImagesArray] = useState<(File | null)[]>([null]);

  const [loading, setLoading] = useState(false);

  const fuelTypes = ["Petrol", "Diesel", "LPG", "CNG & Hybrids", "Electric"];

  const conditionType = ["New", "Used"];

  const transmissionType = ["Manual", "Automatic", "Hybrid"];

  const [formData, setFormData] = useState({
    ImagesFileName: "",
    SellerName: "",
    Phone: "",
    Brand: "",
    Model: "",
    Year: "",
    Color: "",
    Fuel: "",
    Transmission: "",
    EngineType: "",
    CylinderType: "",
    Location: "",
    TruckType: "",
    // SeatType: "",
    Condition: "",
    KilometerDriven: "",
    Plate: "",
    Price: "",
    ImageNameArray: [] as string[],
  });

  const brandValues = brandTypes.map((item) => {
    return (
      <option className="" key={item} value={item}>
        {item}
      </option>
    );
  });

  const truckValues = trucktypes.map((item) => {
    return (
      <option className="" key={item} value={item}>
        {item}
      </option>
    );
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ImagesFileName: uuidv4(),
    }));
  }, []);

  const handleImages = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImagesArray((prevArray) => {
        return [...prevArray, file];
      });
      setFormData((prevData) => {
        return {
          ...prevData,
          ImageNameArray: [...prevData.ImageNameArray, file.name],
        };
      });
    }
  };

  console.log(formData);
  console.log(imagesArray);
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading((prevState) => !prevState);
    try {
      const validImages = imagesArray.filter(
        (image): image is File => image !== null
      );

      for (let i = 0; i < validImages.length; i++) {
        const image = validImages[i];
        const imageRef = ref(
          storage,
          `images/${formData.ImagesFileName}/${image.name}`
        );
        await uploadBytes(imageRef, image);
      }

      await addDoc(collection(db, "carListings"), formData);
      alert("Car listing added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding car listing!");
    }
    setLoading((prevState) => !prevState);
  };

  function handleFuelSelection(
    event: React.MouseEvent<HTMLButtonElement>,
    fuel: string
  ) {
    event.preventDefault();
    setFormData((prevData) => {
      return { ...prevData, Fuel: fuel };
    });
  }

  function handleConditionSelection(
    event: React.MouseEvent<HTMLButtonElement>,
    condition: string
  ) {
    event.preventDefault();
    setFormData((prevData) => {
      return { ...prevData, Condition: condition };
    });
  }
  function handleTransmissionSelection(
    event: React.MouseEvent<HTMLButtonElement>,
    transmission: string
  ) {
    event.preventDefault();
    setFormData((prevData) => {
      return { ...prevData, Transmission: transmission };
    });
  }
  console.log(user);
  return (
    <>
      {!user ? (
        <LoginPrompt />
      ) : (
        <>
          <h6 className={`${styles.adHeading} text-center text-2xl p-8`}>
            Post Your Ad
          </h6>
          <div className={styles.divFormContainer}>
            <div className="text-2xl mt-4 mb-4 p-4 pl-6">
              <h2>Include Car Details</h2>
            </div>
            <form
              autoComplete="off"
              className={styles.formContainer}
              onSubmit={handleSubmit}
            >
              <div className={styles.brandTruckContainer}>
                <div>
                  <div>
                    <label>Brand:</label>
                  </div>
                  <select
                    name="Brand"
                    onChange={handleChange}
                    value={formData.Brand}
                    className="w-[262px] h-[50px] px-2 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  >
                    <option value="" hidden disabled></option>
                    {brandValues}
                  </select>
                </div>
                <div>
                  <label>Truck Type:</label>
                  <select
                    name="TruckType"
                    onChange={handleChange}
                    value={formData.TruckType}
                    className="w-full h-[50px] px-2 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  >
                    <option value="" hidden disabled></option>
                    {truckValues}
                  </select>
                </div>
                <div>
                  <label>Model:</label>
                  <input
                    type="text"
                    name="Model"
                    onChange={handleChange}
                    value={formData.Model}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <label>Year:</label>
                  <input
                    type="text"
                    name="Year"
                    onChange={handleChange}
                    value={formData.Year}
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label>Color:</label>
                  <input
                    type="text"
                    name="Color"
                    onChange={handleChange}
                    value={formData.Color}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
              </div>
              <div>
                <label>Fuel:</label>
                <div>
                  {fuelTypes.map((fuel, index) => (
                    <button
                      key={index}
                      onClick={(event) => handleFuelSelection(event, fuel)}
                      style={{
                        padding: "10px 20px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor:
                          formData.Fuel === fuel ? "#ddd" : "transparent",
                      }}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
                <p className="mt-4 font-bold">Upload Images:</p>
                <div className={styles.imageUploadContainer}>
                  {/* <input
                type="file"
                accept="images/*"
                onChange={(event) => handleImages(event)}
                className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
              /> */}
                  {imagesArray.map((image, index) => (
                    <input
                      key={index}
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImages(index, event)}
                      className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                    />
                  ))}
                </div>
              </div>
              <div className={styles.lineContainer}></div>
              <div className={styles.engineCylinderContainer}>
                <div>
                  <label>Engine Type:</label>
                  <input
                    type="text"
                    name="EngineType"
                    onChange={handleChange}
                    value={formData.EngineType}
                    maxLength={3}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,
                        ""
                      );

                      const parts = e.currentTarget.value.split(".");
                      if (parts.length > 2) {
                        e.currentTarget.value =
                          parts[0] + "." + parts.slice(1).join("");
                      }
                    }}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label>Cylinder Type:</label>
                  <input
                    type="text"
                    name="CylinderType"
                    onChange={handleChange}
                    value={formData.CylinderType}
                    maxLength={1}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Transmission</label>
                <div>
                  {transmissionType.map((transmission, index) => {
                    return (
                      <button
                        key={index}
                        onClick={(event) =>
                          handleTransmissionSelection(event, transmission)
                        }
                        value={formData.Transmission}
                        style={{
                          padding: "10px 20px",
                          margin: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          backgroundColor:
                            formData.Transmission === transmission
                              ? "#ddd"
                              : "transparent",
                        }}
                      >
                        {transmission}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.locationContainer}>
                <label>Location:</label>
                <input
                  type="text"
                  name="Location"
                  onChange={handleChange}
                  value={formData.Location}
                  className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                />
              </div>
              <div className={styles.lineContainer}></div>
              <div className={styles.conditionTypeContainer}>
                <label>Condition Type:</label>
                <div className="items-left">
                  {conditionType.map((condition, index) => (
                    <button
                      key={index}
                      onClick={(event) =>
                        handleConditionSelection(event, condition)
                      }
                      style={{
                        padding: "10px 20px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor:
                          formData.Condition === condition
                            ? "#ddd"
                            : "transparent",
                      }}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.seatConditionKilometerPlateContainer}>
                {/* <div>
              <label>Seat Type:</label>
              <input
                type="text"
                name="SeatType"
                onChange={handleChange}
                value={formData.SeatType}
                maxLength={1}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ""
                  );
                }}
                className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
              />
            </div> */}
                <div>
                  <label>Miles Driven:</label>
                  <input
                    type="text"
                    name="KilometerDriven"
                    onChange={handleChange}
                    value={formData.KilometerDriven}
                    maxLength={7}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9,]/g,
                        ""
                      );
                    }}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label>Plate:</label>
                  <input
                    type="text"
                    name="Plate"
                    onChange={handleChange}
                    value={formData.Plate}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="text"
                    name="Price"
                    onChange={handleChange}
                    value={formData.Price}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9,]/g,
                        ""
                      );
                    }}
                    className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                  />
                </div>
              </div>
              <div className={styles.lineContainer}></div>
              <div className={styles.sellerDetails}>
                <h2 className="-mx-[10%] pb-4 text-2xl">Review Your Details</h2>
                <div className="flex justify-between flex-wrap">
                  <div className="pb-4">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="SellerName"
                      onChange={handleChange}
                      value={formData.SellerName}
                      className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Your Phone Number</label>
                    <input
                      type="tel"
                      name="Phone"
                      className="w-[265px] px-2 py-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 bg-white text-gray-700"
                      // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      onChange={handleChange}
                      maxLength={10}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\D/g,
                          ""
                        );
                      }}
                      value={formData.Phone}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button disabled={loading}>
                  {loading ? "Submitting..." : "Post Now"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
