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

const App = () => {
  const { sendRequest: fetchContacts, isLoading } = useHttp();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const signUpSuccess = useSelector((state) => state.auth.signUpSuccess);

  const loggedInSuccess = useSelector((state) => state.auth.loggedInSuccess);

  const dispatch = useDispatch();
  const reqChanged = useSelector((state) => state.contact.reqHasChanged);

  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(authActions.stayLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const applyContacts = (data) => {
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
  }, [dispatch, fetchContacts, reqChanged, token, isLoggedIn]);

  return (
    <BrowserRouter>
      {isLoading && <LoadingBar />}
      {loggedInSuccess && (
        <ToastBar type="success" message="You have successfully logged in" />
      )}
      {signUpSuccess && (
        <ToastBar type="success" message="You have successfully signed up" />
      )}
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
