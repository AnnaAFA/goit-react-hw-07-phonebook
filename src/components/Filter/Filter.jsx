import PropTypes from 'prop-types';
import { FilterForm, FilterTitle } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onFilterChange = e => {
    const filterValue = e.target.value.toLowerCase();

    dispatch(setFilter(filterValue));
  };

  const filter = useSelector(state => state.filter);

  return (
    <>
      <FilterForm>
        <FilterTitle>
          <span>Find contact by name</span>
          <input type="text" value={filter} onChange={onFilterChange} />
        </FilterTitle>
      </FilterForm>
    </>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};
