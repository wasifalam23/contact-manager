import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../hooks/http-hook';
import ConfirmModal from '../../../utils/ConfirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  faHome,
  faEnvelope,
  faPhone,
  faEdit,
  faTrash,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ContactItem.scss';
import ToastBar from '../../../utils/ToastBar/ToastBar';

const ContactItem = (props) => {
  const {
    sendRequest: deleteContact,
    deleteReqSuccess: contactDeletedIsSuccess,
  } = useHttp();
  console.log(contactDeletedIsSuccess);
  const [showConfirmModal, setShowConfirmModal] = useState();

  const navigate = useNavigate();

  const editContactHandler = () => {
    navigate(`/editContact/${props.id}`);
  };

  const deleteContactHandler = () => {
    setShowConfirmModal(true);
  };

  const confirmModalConfirmHandler = () => {
    const applyDeletedData = (data) => {
      if (data.status === 'fail') return;
    };

    deleteContact(
      {
        url: `http://localhost:3000/api/v1/contacts/${props.id}`,
        method: 'DELETE',
      },
      applyDeletedData
    );

    setShowConfirmModal(false);
  };

  const confirmModalCancelHandler = () => {
    setShowConfirmModal(false);
  };

  const dateOfBirth = moment(props.birthDate).format('Do MMM YYYY');

  const birthAgeStr =
    dateOfBirth === 'Invalid date'
      ? 'Not Available'
      : `Born on ${dateOfBirth} and age is ${props.age}`;

  const address = props.address === '' ? 'Not Available' : props.address;

  return (
    <React.Fragment>
      {contactDeletedIsSuccess && (
        <ToastBar type="success" message="Contact is deleted successfully" />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          message="Do you really want to delete this contact?"
          onCancel={confirmModalCancelHandler}
          onConfirm={confirmModalConfirmHandler}
        />
      )}

      <li className="contact-item__container--main">
        <div className="contact-item__container">
          <header className="contact-item__header">
            <FontAwesomeIcon
              className="contact-item__fa-icon--edit"
              onClick={editContactHandler}
              icon={faEdit}
            />
            <FontAwesomeIcon
              className="contact-item__fa-icon--trash"
              onClick={deleteContactHandler}
              icon={faTrash}
            />
          </header>

          <main className="contact-item__content--main">
            <div className="contact-item__name-avatar--holder">
              <img
                className="contact-item__avatar"
                src={`http://localhost:3000/contacts/${props.img}`}
                alt="contact-avatar"
              />
              <h3 className="contact-item__name">
                {props.firstName} {props.lastName}
              </h3>
            </div>

            <div className="contact-item__content--holder">
              <div className="contact-item__content--left">
                <div className="contact-item__icon-item--holder">
                  <FontAwesomeIcon
                    className="contact-item__fa-icon--home"
                    icon={faHome}
                  />
                  <p className="contact-item__address">{address}</p>
                </div>
                <div className="contact-item__icon-item--holder">
                  <FontAwesomeIcon
                    className="contact-item__fa-icon--user"
                    icon={faUserAlt}
                  />
                  <p className="contact-item__birth-info">{birthAgeStr}</p>
                </div>
              </div>

              <div className="contact-item__content--right">
                <div className="contact-item__icon-item--holder">
                  <FontAwesomeIcon
                    className="contact-item__fa-icon--phone"
                    icon={faPhone}
                  />
                  <p className="contact-item__phone">{props.phone}</p>
                </div>
                <div className="contact-item__icon-item--holder">
                  <FontAwesomeIcon
                    className="contact-item__fa-icon--email"
                    icon={faEnvelope}
                  />
                  <p className="contact-item__email">{props.email}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </li>
    </React.Fragment>
  );
};

export default ContactItem;
