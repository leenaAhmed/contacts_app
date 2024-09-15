import React, { useState } from 'react';
import styles from './style.module.css';
import { FaPhone, FaEnvelope,FaTrash, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const ContactCard = ({ contact , className = '' ,handleDelete}) => {
  const [hoveredItem, setHoveredItem] = useState('name');  
 
    return (
        <div  className={`${styles.contactCard} ${className}`}>
        <div className={styles.profileImage}>
            <img src={contact.picture.large} alt={contact.name.first} />
        </div>
        
        {hoveredItem === 'name' && (
            <h2 className={styles.greeting}>Hi, My name is</h2>
        )}
        {hoveredItem === 'email' && (
            <h2 className={styles.greeting}>My email address is</h2>
        )}
        {hoveredItem === 'phone' && (
            <h2 className={styles.greeting}>My phone number is</h2>
        )}
        {hoveredItem === 'location' && (
            <h2 className={styles.greeting}>My address is</h2>
        )}
    
       <Link to={`/contact/${contact.login.uuid}`}>
            <h1 className={styles.name}>
                    {hoveredItem === 'name' && `${contact.name.first} ${contact.name.last}`}
                    {hoveredItem === 'email' && `${contact.email}`}
                    {hoveredItem === 'phone' && `${contact.phone}`}
                    {hoveredItem === 'location' && `${contact.location.city}, ${contact.location.country}`}
            </h1>
        </Link>
        <div className={styles.iconBar}>
            <FaPhone 
            className={styles.icon} 
            onMouseEnter={() => setHoveredItem('phone')} 
            onMouseLeave={() => setHoveredItem('name')}
            />
            <FaEnvelope 
            className={styles.icon} 
            onMouseEnter={() => setHoveredItem('email')} 
            onMouseLeave={() => setHoveredItem('name')}
            />
            <FaMapMarkerAlt 
            className={styles.icon} 
            onMouseEnter={() => setHoveredItem('location')} 
            onMouseLeave={() => setHoveredItem('name')}
            />
                <FaLock className={styles.icon} />
            <FaTrash 
            className={styles.icon} 
            onClick={() => handleDelete(contact.login.uuid)} 
            title="Delete Contact"
            />
        </div>
   </div>
  );
};

