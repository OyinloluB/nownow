import React, { useRef, useState } from "react";
import styles from "./style.module.css";
import moment from "moment";

const EligibilityWrapper = () => {
  const ageEligible = localStorage.getItem("userEligible") === "true";
  const [invalidForm, setInvalidForm] = useState(false);
  const now = new Date();
  const [ageState, setAgeState] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });

  const [eligible, setEligible] = useState(ageEligible);

  const inputPicker = (e, key) => {
    setAgeState({
      ...ageState,
      [key]: e.target.value,
    });
  };

  const submitFunc = () => {
    const dateReceived = moment(
      `${ageState.year}-${String(ageState.month).padStart(2, "0")}-${String(
        ageState.day
      ).padStart(2, "0")}`
    );
    const dateLimit = moment().subtract(18, "y");

    if (dateReceived.isBefore(dateLimit) || dateReceived.isSame(dateLimit)) {
      setEligible(true);
      localStorage.setItem("userEligible", "true");
    } else {
      setEligible(false);
      localStorage.setItem("userEligible", "false");
      setInvalidForm(true);
    }
  };

  const inputs = (
    <>
      <div className={styles.inputGroupInner}>
        <span> YYYY </span>
        <input
          type="number"
          className="inputBox"
          value={ageState.year}
          placeholder="2020"
          min="1000"
          required
          onChange={(e) => inputPicker(e, "year")}
        />
      </div>
      <div className={styles.inputGroupInner}>
        <span> MM </span>
        <input
          type="number"
          className="inputBox"
          value={ageState.month}
          placeholder="01"
          min="1"
          max="12"
          onChange={(e) => inputPicker(e, "month")}
          required
        />
      </div>
      <div className={styles.inputGroupInner}>
        <span> DD </span>
        <input
          type="number"
          className="inputBox"
          value={ageState.day}
          placeholder="01"
          min="1"
          max="31"
          onChange={(e) => inputPicker(e, "day")}
          required
        />
      </div>
    </>
  );

  return (
    <div
      style={{ zIndex: "1000" }}
      // className={classNames(
      //   styles.ModalContainer,
      //   !eligible && styles.activeModal
      // )}
    >
      <div className={styles.modalContent}>
        <h2> We need to check your age </h2>
        <p> Please enter your birth date below </p>
        <div className={styles.inputGroup}>{inputs}</div>
        {invalidForm && (
          <p className={styles.error}>
            You're not eligible to use this website.
          </p>
        )}
        <button onClick={submitFunc}>Submit</button>
        <p className={styles.tandc}>
          By entering this site you are agreeing to the terms of use and Privacy
          policy
        </p>
      </div>
    </div>
  );
};
export default EligibilityWrapper;

// if its null then ask.
// if true then dont show
// if false then show error page
