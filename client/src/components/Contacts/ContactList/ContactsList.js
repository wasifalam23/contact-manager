import React from 'react';

import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.scss';

const ContactsList = () => {
  const contactsData = useSelector((state) => state.contact.contactData);

  return (
    <ul className="contact-list__container">
      {contactsData.map((contact) => {
        return (
          <ContactItem
            key={contact._id}
            img={contact.photo}
            firstName={contact.firstName}
            lastName={contact.lastName}
            dateOfBirth={contact.dateOfBirth}
            address={contact.address}
            email={contact.email}
            phone={contact.phone}
          />
        );
      })}
    </ul>
  );
};

export default ContactsList;
