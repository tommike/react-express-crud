import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { handleAddTask } from '../actions/tasks';
import TextField from './text-field';
import SelectField from './select-field';
import SubmitField from './submit-field';

const initialState = {
  deliveryAt: '',
  name: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
  phone: '',
};

class TasksForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  componentDidUpdate() {
    const { showErrorMessage } = this.state;

    if (showErrorMessage) {
      window.scroll(0, 0);
    }
  }

  handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    this.setState(() => ({
      [fieldName]: fieldValue,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { dispatch } = this.props;
    const data = { recipient: {} };

    ({
      deliveryAt: data.delivery_at,
      name: data.recipient.name,
      street: data.recipient.street,
      city: data.recipient.city,
      state: data.recipient.state,
      country: data.recipient.country,
      zipcode: data.recipient.zipcode,
      phone: data.recipient.phone,
    } = this.state);

    dispatch(handleAddTask(data, this.afterSubmit));
  }

  afterSubmit(success, error) {
    if (success === true) {
      const { history } = this.props;

      history.push({ pathname: '/task-list', state: { showSuccess: true } });
    } else {
      this.setState(() => ({
        showErrorMessage: error,
      }));
    }
  }

  isDisabled() {
    const { deliveryAt, name, street, city, state, country, zipcode, phone } = this.state;

    const reg = /\d{2}:\d{2}:\d{4}\s\d{2}:\d{2}/;

    return (
      (deliveryAt && !reg.test(deliveryAt)) ||
      !name ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zipcode ||
      !phone
    );
  }

  render() {
    const {
      deliveryAt,
      name,
      street,
      city,
      state,
      country,
      zipcode,
      phone,
      showErrorMessage,
    } = this.state;

    const { availableCountries } = this.props;

    return (
      <>
        {showErrorMessage && (
          <div className="form-feedback form-feedback--error">
            <p className="form-feedback__text">Error: {showErrorMessage}.</p>
          </div>
        )}

        <form onSubmit={this.handleSubmit} className="form">
          <TextField
            name="deliveryAt"
            label="Delivery At"
            onChange={this.handleChange}
            placeholder="dd:mm:yyyy hh:mm"
            value={deliveryAt}
            autocomplete="off"
            required
          />
          <TextField
            name="name"
            label="Recipient Name"
            onChange={this.handleChange}
            value={name}
            autocomplete="off"
            required
          />
          <TextField
            name="street"
            label="Recipient Street"
            onChange={this.handleChange}
            value={street}
            autocomplete="off"
            required
          />
          <TextField
            name="city"
            label="Recipient City"
            onChange={this.handleChange}
            value={city}
            autocomplete="off"
            required
          />
          <TextField
            name="state"
            label="Recipient State"
            onChange={this.handleChange}
            value={state}
            autocomplete="off"
            required
          />
          <SelectField
            name="country"
            label="Recipient Country"
            onChange={this.handleChange}
            options={availableCountries}
            optionSelected={country}
            required
          />
          <TextField
            name="zipcode"
            label=" Recipient Zipcode"
            onChange={this.handleChange}
            value={zipcode}
            autocomplete="off"
            required
          />
          <TextField
            name="phone"
            label="Recipient Phone"
            onChange={this.handleChange}
            value={phone}
            autocomplete="off"
            required
          />
          <SubmitField disabled={this.isDisabled()} />
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  availableCountries: state.countries,
});

TasksForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
};

export { TasksForm };

export default connect(mapStateToProps)(withRouter(TasksForm));
