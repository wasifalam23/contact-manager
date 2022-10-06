import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import ToastBar from '../../../utils/ToastBar/ToastBar';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.scss';

const ContactsList = () => {
  const [hasDeleted, setHasDeleted] = useState(false);
  const contactsData = useSelector((state) => state.contact.contactData);

  const contactDeleted = (isDeleted) => {
    console.log(isDeleted);
    if (isDeleted) setHasDeleted(true);
  };

  return (
    <ul className="contact-list__container">
      {hasDeleted && (
        <ToastBar type="success" message="Contact is deleted successfully" />
      )}
      {contactsData.map((contact) => {
        return (
          <ContactItem
            key={contact._id}
            id={contact.id}
            img={contact.photo}
            firstName={contact.firstName}
            lastName={contact.lastName}
            birthDate={contact.dateOfBirth}
            age={contact.age}
            address={contact.address}
            email={contact.email}
            phone={contact.phone}
            onContactDelete={contactDeleted}
          />
        );
      })}
    </ul>
  );
};

export default ContactsList;
