import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import React, { useState, useEffect } from 'react';
import { ContactCard } from './../../components/card/index';

const ContactDetails = () => {
  const { uuid } = useParams();
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = () => {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      if (storedUsers) {
        const user = storedUsers.find(user => user.login.uuid === uuid);
        if (user) {
          setContact(user);
        } else {
          setError('Contact not found');
        }
      } else {
        setError('No users found in localStorage');
      }
    };

    fetchContact();
  }, [uuid]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!contact) {
    return <p>Loading contact details...</p>;
  }

  return (
    <div>
      <div className={styles.gridContainer}>
       <div className={styles.contactCardWrapper}>
        <ContactCard className={styles.card} key={contact.login.uuid} contact={contact} />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
