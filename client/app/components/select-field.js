import React from 'react';
import PropTypes from 'prop-types';

const SelectField = props => {
  const { name, label, onChange, options, optionSelected, required } = props;

  return (
    <div className="form__field">
      <label htmlFor={name} className="form__label">
        {required && <span className="form__sign--required">*</span>} {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        value={optionSelected}
        className="form__input form__select"
        required={required}
      >
        <option value="" key="none">
          Please select
        </option>
        {options.map(({ id, name: CountryName }) => (
          <option value={id} key={id}>
            {CountryName}
          </option>
        ))}
        <option value="Austria hard coded" key="austria-hard-coded">
          Austria hard coded
        </option>
      </select>
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  optionSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default SelectField;
