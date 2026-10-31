import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/filterSlice';
import Contact from '../Contact/Contact';
import './ContactList.css';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const lowerCaseFilter = filter.toLowerCase();

  const visibleContacts = contacts.filter(contact => {
    const lowerCaseName = contact.name.toLowerCase();
    return lowerCaseName.includes(lowerCaseFilter);
  });

  const hasContacts = visibleContacts.length > 0;

  return (
    <section className="contact-list">
      <h2>Contacts</h2>

      {hasContacts ? (
        <ul>
          {visibleContacts.map(contact => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </section>
  );
};

export default ContactList;
