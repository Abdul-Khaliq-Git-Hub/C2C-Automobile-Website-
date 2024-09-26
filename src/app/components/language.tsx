"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import styles from "./language.module.css";

function Language() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <FontAwesomeIcon icon={faLanguage} size="2xl" />
      {isOpen && (
        <select className={styles.dropdownContent} value={language}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      )}
    </div>
  );
}

export default Language;
