import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactActions } from './store/contact-slice';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AddContact from './pages/AddContact';
import Contacts from './pages/Contacts';
import useHttp from './hooks/http-hook';

const App = () => {
  const [requestChange, setRequestChange] = useState(false);
  const requestIsSuccess = useSelector((state) => state.ui.requestIsSuccess);

  const { sendRequest: fetchContacts } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('App', requestIsSuccess);
    if (requestIsSuccess) {
      setRequestChange((prev) => !prev);
    }
  }, [requestIsSuccess]);

  useEffect(() => {
    const applyContacts = (data) => {
      dispatch(contactActions.storeData({ contacts: data.data.contacts }));
    };

    fetchContacts(
      { url: 'http://localhost:3000/api/v1/contacts' },
      applyContacts
    );
  }, [dispatch, fetchContacts, requestChange]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/editContact/:id" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
