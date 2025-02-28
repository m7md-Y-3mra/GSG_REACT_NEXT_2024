"use client";
import React, { FC } from "react";
import styles from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Oops!!!</h2>
      <h3 className={styles.desc}>Something went wrong, {error.message}</h3>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={() => reset()}>
          try again
        </button>
        <button className={styles.btn} onClick={() => window.location.reload()}>
          refresh the page
        </button>
      </div>
    </div>
  );
};

export default Error;
