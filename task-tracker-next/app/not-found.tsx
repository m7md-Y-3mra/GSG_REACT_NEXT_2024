import Link from "next/link";
import React from "react";
import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.desc}>Sorry, we couldn&apos;t find this task 😕</div>
      <Link className={styles.btn} href="/">Go to Home Page</Link>
    </div>
  );
};

export default NotFound;
