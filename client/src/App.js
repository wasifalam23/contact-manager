import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactActions } from './store/contact-slice';
import { authActions } from './store/auth-slice';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AddContact from './pages/AddContact';
import Contacts from './pages/Contacts';
import AuthPage from './pages/AuthPage';
import LoadingBar from './utils/LoadingBar/LoadingBar';
import useHttp from './hooks/http-hook';
import ToastBar from './utils/ToastBar/ToastBar';

let isgetInitial = true;
let isdeleteInitial = true;
const App = () => {
  const { sendRequest: fetchContacts, isLoading } = useHttp();
  const { sendRequest: deleteContact, deleteReqSuccess: contactIsDeleted } =
    useHttp();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const reqChanged = useSelector((state) => state.contact.reqHasChanged);
  const deleteId = useSelector((state) => state.contact.deleteContactId);

  useEffect(() => {
    console.log('stayLoggedin running');
    dispatch(authActions.stayLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    if (isgetInitial) {
      isgetInitial = false;
      return;
    }

    const applyContacts = (data) => {
      console.log(data);
      dispatch(contactActions.storeData(data.data.contacts));
    };

    fetchContacts(
      {
        url: 'http://localhost:3000/api/v1/contacts',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      applyContacts
    );
  }, [dispatch, fetchContacts, reqChanged, token]);

  useEffect(() => {
    if (isdeleteInitial) {
      isdeleteInitial = false;
      return;
    }

    const applyData = (data) => {
      console.log(data);
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
  }, [deleteId, deleteContact, token]);

  return (
    <BrowserRouter>
      {contactIsDeleted && (
        <ToastBar type="success" message="contact is deleted" />
      )}
      {isLoading && <LoadingBar />}
      <Header />

      <Routes>
        {isLoggedIn && <Route path="/" element={<Contacts />} />}
        {isLoggedIn && <Route path="/addContact" element={<AddContact />} />}
        {isLoggedIn && (
          <Route path="/editContact/:id" element={<AddContact />} />
        )}
        {!isLoggedIn && <Route path="*" element={<AuthPage />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
