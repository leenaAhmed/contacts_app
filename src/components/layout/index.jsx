import React from 'react';
import styles from './style.module.css';
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className={styles.layout}>
     <div className={styles.sidebar}>
      <div className={styles.search}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
        <button aria-label="search" className={styles.newButton}>New</button>
      </div>
     </div>
      <div className={styles.mainContent}>
         <Outlet />
      </div>
    </div>
  );
};

 
