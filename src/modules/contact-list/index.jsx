import React, { useState, useEffect, useCallback } from 'react';
import { FilterLetters } from './../../components/Filter/index';
import { ContactCard } from './../../components/card/index';
import { Pagination} from './../../components/Pagination/index';
import { getContacts} from './../../core/services/contact.service'
 
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const [resultsPerPage] = useState(15);

  const fetchContacts = useCallback((page) => {
    getContacts(page, resultsPerPage)
      .then((response) => {
        const fetchedContacts = response.data.results;
        localStorage.setItem('users', JSON.stringify(fetchedContacts));
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts);
       })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, [resultsPerPage]);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage, fetchContacts]);

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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
          contact && <ContactCard key={contact.login.uuid} contact={contact} />
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