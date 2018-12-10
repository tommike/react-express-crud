import React from 'react';
import PropTypes from 'prop-types';

const SubmitField = props => {
  const { disabled } = props;

  return (
    <div className="form__field">
      <button className="form__input form__submit" type="submit" disabled={disabled}>
        Submit
      </button>
    </div>
  );
};

SubmitField.propTypes = {
  disabled: PropTypes.bool,
};

export default SubmitField;
