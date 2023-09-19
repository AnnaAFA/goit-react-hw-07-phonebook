import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MainWrapper } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectContacts, selectError } from 'redux/selectors';
import { fetchContactsThunk } from 'redux/operations';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  return (
    <MainWrapper>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />

      {contacts.length > 0 && <ContactList />}
    </MainWrapper>
  );
};
