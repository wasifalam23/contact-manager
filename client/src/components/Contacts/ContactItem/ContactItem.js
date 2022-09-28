import React from 'react';
import {
  faEnvelope,
  faPhone,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import erikImg from '../../../assets/erik.jpg';

import './ContactItem.scss';

const ContactItem = () => {
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
              src={erikImg}
              alt="contact-avatar"
            />
            <h3 className="contact-item__name">John Doe</h3>
          </div>

          <div className="contact-item__content--holder">
            <div className="contact-item__content--left">
              <p className="contact-item__address">793 Adams Drive</p>
              <p className="contact-item__birth-info">
                Born on 18th Jan 2021 and age is 26
              </p>
            </div>

            <div className="contact-item__content--right">
              <div className="contact-item__icon-item--holder">
                <FontAwesomeIcon
                  className="contact-item__fa-icon--phone"
                  icon={faEnvelope}
                />
                <p className="contact-item__phone">+919735771084</p>
              </div>
              <div className="contact-item__icon-item--holder">
                <FontAwesomeIcon
                  className="contact-item__fa-icon--email"
                  icon={faPhone}
                />
                <p className="contact-item__email">johndoe88@gmail.com</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </li>
  );
};

export default ContactItem;
