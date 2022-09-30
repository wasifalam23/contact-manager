import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../utils/Container/Container';
import ContactsList from '../components/Contacts/ContactList/ContactsList';
import ToastBar from '../utils/ToastBar/ToastBar';
import './Pages.scss';

const Contacts = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  const countactCount = <p className="contact__count">Total: 3</p>;

  return (
    <Container
      containerClass="contact__container"
      title="Contacts"
      otherEl={countactCount}
    >
      {isLoading && <ToastBar type="loading" message="Loading..." />}
      <ContactsList />
    </Container>
  );
};

export default Contacts;
