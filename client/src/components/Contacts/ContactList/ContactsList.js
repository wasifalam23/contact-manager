import React, { useEffect } from 'react';

import useHttp from '../../../hooks/http-hook';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import ToastBar from '../../../utils/ToastBar/ToastBar';
import './ContactList.scss';
import { contactActions } from '../../../store/contact-slice';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contact.contactData);
  const deleteId = useSelector((state) => state.contact.deleteContactId);
  const token = localStorage.getItem('token');

  const { sendRequest: deleteContact, deleteReqSuccess: contactIsDeleted } =
    useHttp();

  useEffect(() => {
    if (!deleteId) return;

    const applyData = (data) => {
      if (data.status === 'success') {
        dispatch(contactActions.setDeleteContactId(null));
      }
    };

    console.log('app delete running');
    deleteContact(
      {
        url: `http://localhost:3000/api/v1/contacts/${deleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      applyData
    );
  }, [dispatch, deleteId, deleteContact, token]);

  return (
    <React.Fragment>
      {contactIsDeleted && (
        <ToastBar type="success" message="contact is deleted" />
      )}
      <ul className="contact-list__container">
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
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default ContactsList;
