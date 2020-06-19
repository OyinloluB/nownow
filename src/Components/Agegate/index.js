import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./style.module.css";
import img from "../../assets/logo.png";
import moment from "moment";

import { setEligibility } from "../../redux/auth/auth.actions";

const classNames = (...classes) =>
  classes.filter((className) => className).join(" ");

const EligibilityWrapper = () => {
  const eligible = useSelector((state) => state.auth.eligble);
  const dispatch = useDispatch();

  const [invalidForm, setInvalidForm] = useState(false);
  const now = new Date();
  const [ageState, setAgeState] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });

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
      dispatch(setEligibility(true));
    } else {
      dispatch(setEligibility(false));
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
      className={classNames(
        styles.ModalContainer,
        !eligible && styles.activeModal
      )}
    >
      <div className={styles.modalContent}>
        <img src={img} alt={"Logo"} />
        <span className={"text-center"} style={{color: '#B11917'}}> As part of our commitment to responsible drinking, please provide your date of birth to confirm you are of legal drinking age (18 years and above)</span>
        <p> Please enter your birth date below </p>
        <div className={styles.inputGroup}>{inputs}</div>
        {invalidForm && (
          <p className={styles.error} style={{ color: "#b11917" }}>
            You're not eligible to use this website.
          </p>
        )}
        <button
          onClick={submitFunc}
          style={{
            padding: "8px",
            width: "100px",
            background: "#b11917",
            border: "none",
            color: "white",
          }}
        >
          Submit
        </button>
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
