import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import React, { useState, useEffect } from 'react';
import { ContactCard } from './../../components/card/index';
import { deleteUser } from './../../core/store/actions';
import { useDispatch } from 'react-redux';

const ContactDetails = () => {
  const { uuid } = useParams();
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
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
          <ContactCard className={styles.card}
            handleDelete={handleDelete}
            key={contact.login.uuid} contact={contact} />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
