import React from 'react';
import PropTypes from 'prop-types';

const TextField = props => {
  const { name, label, onChange, placeholder, value, required, autocomplete } = props;

  return (
    <div className="form__field">
      <label htmlFor={name} className="form__label">
        {required && <span className="form__sign--required">*</span>} {label}
      </label>
      <input
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        className="form__input form__text"
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
      />
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
};

export default TextField;
