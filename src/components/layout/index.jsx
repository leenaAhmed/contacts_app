import React from 'react';
import styles from './style.module.css';
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { searchUser } from './../../core/store/actions';

export const Layout = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
  };

  return (
    <div className={styles.layout}>
       <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/create-user" className={styles.navLink}>Create User</Link>
        </div>
         <div className={styles.search}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </nav>
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};
