import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContactButton,
  FormWrapper,
  LabelWrapper,
} from './ContactForm.styled.js';
// import { addContact } from 'redux/contactsSlice.js';
import { selectContacts } from 'redux/selectors.js';
import { addContactThunk } from 'redux/operations.js';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onChangeValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const duplicateName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicateName) {
      return alert(`${name} is already in contact`);
    }
    dispatch(addContactThunk(name, number));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit}>
        <LabelWrapper>
          <span>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash, and spaces. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onChangeValue}
          />
        </LabelWrapper>
        <LabelWrapper>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={onChangeValue}
          />
        </LabelWrapper>

        <ContactButton type="submit">Add contact</ContactButton>
      </FormWrapper>
    </>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func,
};
