import PropTypes from 'prop-types';
import { List, ListButton, ListWrapper } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onRemoveContact = id => dispatch(removeContact(id));

  return (
    <ListWrapper>
      <List>
        {filterContacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <ListButton
              type="button"
              onClick={() => onRemoveContact(contact.id)}
            >
              Delete
            </ListButton>
          </li>
        ))}
      </List>
    </ListWrapper>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onRemoveContact: PropTypes.func,
};
