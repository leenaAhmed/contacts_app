import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactCard } from './../../components/card/index';
import { Pagination } from './../../components/Pagination/index';
import { getContacts } from './../../core/services/contact.service';
import styles from './style.module.css';
import { deleteUser, setUsers } from './../../core/store/actions';
import { FilterLetters } from './../../components/Filter/index';

const ContactList = () => {
  const contacts = useSelector((state) => state.users);
  const searchQuery = useSelector((state) => state.searchQuery);  
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const [resultsPerPage] = useState(16);
  const dispatch = useDispatch();

  const fetchContacts = useCallback((page) => {
    getContacts(page, resultsPerPage)
      .then((response) => {
        const fetchedContacts = response.data.results;
        localStorage.setItem('users', JSON.stringify(fetchedContacts));
        dispatch(setUsers(fetchedContacts));
        setFilteredContacts(fetchedContacts);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, [resultsPerPage, dispatch]);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage, fetchContacts]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter((contact) =>
        contact.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.name.last.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    if (letter === 'all') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.first.toLowerCase().startsWith(letter.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };
  const letters = Array.from(
    new Set(contacts.map((contact) => contact.name.first[0].toUpperCase()))
  );
  return (
    <div>
       <FilterLetters
        letters={letters}
        onLetterClick={handleLetterClick}
        selectedLetter={selectedLetter}
      />
      <div className="gridContainer mb-2">
        {filteredContacts.map((contact) => (
          <ContactCard
            className={styles.contact_card}
            handleDelete={handleDelete}
            key={contact.login.uuid}
            contact={contact}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContactList;
