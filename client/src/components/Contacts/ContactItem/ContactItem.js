import React from 'react';
import moment from 'moment';
import {
  faEnvelope,
  faPhone,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ContactItem.scss';

const ContactItem = (props) => {
  const dateOfBirth = moment(props.birthDate).format('Do MMM YYYY');
  const birthAgeStr = `Born on ${dateOfBirth} and age is ${props.age}`;

  return (
    <li className="contact-item__container--main">
      <div className="contact-item__container">
        <header className="contact-item__header">
          <FontAwesomeIcon
            className="contact-item__fa-icon--edit"
            icon={faEdit}
          />
          <FontAwesomeIcon
            className="contact-item__fa-icon--trash"
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
              <p className="contact-item__address">{props.address}</p>
              <p className="contact-item__birth-info">{birthAgeStr}</p>
            </div>

            <div className="contact-item__content--right">
              <div className="contact-item__icon-item--holder">
                <FontAwesomeIcon
                  className="contact-item__fa-icon--phone"
                  icon={faEnvelope}
                />
                <p className="contact-item__phone">{props.phone}</p>
              </div>
              <div className="contact-item__icon-item--holder">
                <FontAwesomeIcon
                  className="contact-item__fa-icon--email"
                  icon={faPhone}
                />
                <p className="contact-item__email">{props.email}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </li>
  );
};

export default ContactItem;
