import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../utils/Container/Container';
import ContactsList from '../components/Contacts/ContactList/ContactsList';
import './Pages.scss';

const Contacts = () => {
  const contacts = useSelector((state) => state.contact.contactData);

  const countactCount = (
    <p className="contact__count">Total: {contacts.length}</p>
  );

  return (
    <Container
      containerClass="contact__container"
      title="Contacts"
      otherEl={countactCount}
    >
      <ContactsList />
    </Container>
  );
};

export default Contacts;
