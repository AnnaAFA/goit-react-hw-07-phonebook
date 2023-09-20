import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContactButton,
  FormWrapper,
  LabelWrapper,
} from './ContactForm.styled.js';
import { selectContacts } from 'redux/selectors.js';
import { addContactThunk } from 'redux/operations.js';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const onChangeValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
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
    dispatch(addContactThunk({ name, phone }));

    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
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
            name="phone"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
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
