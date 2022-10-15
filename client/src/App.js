import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactActions } from './store/contact-slice';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AddContact from './pages/AddContact';
import Contacts from './pages/Contacts';
import AuthPage from './pages/AuthPage';
import LoadingBar from './utils/LoadingBar/LoadingBar';
import useHttp from './hooks/http-hook';
import ToastBar from './utils/ToastBar/ToastBar';

let isInitial = true;
const App = () => {
  const { sendRequest: fetchContacts, isLoading } = useHttp();
  const { sendRequest: deleteContact, deleteReqSuccess: contactIsDeleted } =
    useHttp();

  const dispatch = useDispatch();
  const reqChanged = useSelector((state) => state.contact.reqHasChanged);
  const deleteId = useSelector((state) => state.contact.deleteContactId);

  useEffect(() => {
    const applyContacts = (data) => {
      dispatch(contactActions.storeData(data.data.contacts));
    };

    fetchContacts(
      { url: 'http://localhost:3000/api/v1/contacts' },
      applyContacts
    );
  }, [dispatch, fetchContacts, reqChanged]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
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
      },
      applyData
    );
  }, [deleteId, deleteContact]);

  return (
    <BrowserRouter>
      {contactIsDeleted && (
        <ToastBar type="success" message="contact is deleted" />
      )}
      {isLoading && <LoadingBar />}
      <Header />

      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/editContact/:id" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
