import React from 'react';
import AddContactForm from '../components/FormElements/AddContactForm';
import Container from '../utils/Container/Container';
import './Pages.scss';

const AddContact = () => {
  return (
    <Container containerClass="add-contact__container" title="Add Contact">
      <AddContactForm />
    </Container>
  );
};

export default AddContact;
