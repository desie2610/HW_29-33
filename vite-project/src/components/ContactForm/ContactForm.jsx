import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import './ContactForm.css';

const ContactForm = ({ onContactAdded }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanNumber = number.trim();

    const contactAlreadyExists = contacts.some(contact => {
      return contact.name.toLowerCase() === cleanName.toLowerCase();
    });

    if (contactAlreadyExists) {
      window.alert(`${cleanName} is already in contacts.`);
      return;
    }

    const newContact = {
      id: crypto.randomUUID(),
      name: cleanName,
      number: cleanNumber,
    };

    dispatch(addContact(newContact));

    setName('');
    setNumber('');
    onContactAdded();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onContactAdded: PropTypes.func.isRequired,
};

export default ContactForm;
