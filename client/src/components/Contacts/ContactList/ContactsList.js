import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { contactActions } from '../../../store/contact-slice';
import { toast } from 'react-toastify';

import useHttp from '../../../hooks/http-hook';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.scss';

const ContactsList = () => {
  const { sendRequest: deleteContact } = useHttp();

  const dispatch = useDispatch();

  const contactsData = useSelector((state) => state.contact.contactData);
  const deleteId = useSelector((state) => state.contact.deleteContactId);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!deleteId) return;

    const applyData = (data) => {
      if (data.status === 'success') {
        dispatch(contactActions.setReqHasChanged());
        dispatch(contactActions.setDeleteContactId(null));
        toast.success('Contact is deleted successfully!');
      }
    };

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
