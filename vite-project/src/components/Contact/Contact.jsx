import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import './Contact.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className="contact">
      <div className="contact-avatar" aria-hidden="true">
        {name.slice(0, 1).toUpperCase()}
      </div>

      <div className="contact-details">
        <span className="contact-name">{name}</span>
        <span className="contact-number">{number}</span>
      </div>

      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${name}`}
        onClick={handleDelete}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 13h10l1-13" />
        </svg>
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
