import P from 'prop-types';
import './styles.css';
import React from 'react'

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      onChange={handleChange}
      value={searchValue}
      type="search"
      className="text-input"
      placeholder="type your search!"
    />
  );
};
TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
