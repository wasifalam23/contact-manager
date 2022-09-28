import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.scss';

const ContactsList = () => {
  return (
    <ul className="contact-list__container">
      <ContactItem />
      <ContactItem />
    </ul>
  );
};

export default ContactsList;
