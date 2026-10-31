import { useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleContactAdded = () => {
    setIsFormOpen(false);
  };

  return (
    <main className="app">
      <header className="app-header">
        <div className="app-title">
          <div className="title-icon" aria-hidden="true">
            <span />
            <span />
          </div>
          <h1>Contacts</h1>
        </div>

        <button
          className="add-contact-button"
          type="button"
          onClick={handleToggleForm}
        >
          <span aria-hidden="true">+</span>
          {isFormOpen ? 'Close form' : 'Add contact'}
        </button>
      </header>

      {isFormOpen && <ContactForm onContactAdded={handleContactAdded} />}

      <SearchBox />
      <ContactList />
    </main>
  );
};

export default App;
