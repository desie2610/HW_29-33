import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectFilter } from '../../redux/filterSlice';
import './SearchBox.css';

const SearchBox = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <label className="search-box">
      <span className="visually-hidden">Search contacts</span>
      <span className="search-icon" aria-hidden="true" />
      <input
        value={filter}
        placeholder="Search contacts..."
        onChange={handleFilterChange}
      />
    </label>
  );
};

export default SearchBox;
