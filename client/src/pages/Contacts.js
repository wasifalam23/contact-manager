import React from 'react';
import Container from '../utils/Container/Container';
import ContactsList from '../components/Contacts/ContactList/ContactsList';
import './Pages.scss';

const Contacts = () => {
  const countactCount = <p className="contact__count">Total: 3</p>;

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
