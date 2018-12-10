/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

const TaskListView = props => {
  const { tasks } = props;

  return (
    <ul className="tasks-list">
      {tasks.map((item, index) => {
        const {
          delivery_at,
          recipient: { name, street, zipcode, city, state, country, phone },
        } = item;

        /* ideally use item-id from database for key attribute */
        return (
          <li key={index} className="tasks-list__item">
            <p>
              <strong>Delivery At:</strong>
              <time dateTime={delivery_at} className="tasks-list__date">
                {delivery_at}:
              </time>
            </p>
            <p>
              <strong>Recipient Name:</strong> {name}
            </p>
            <p>
              <strong>Recipient Street:</strong> {street}{' '}
            </p>
            <p>
              <strong>Recipient City:</strong> {zipcode}
            </p>
            <p>
              <strong>Recipient State:</strong> {city}{' '}
            </p>
            <p>
              <strong>Recipient Country:</strong> {state}{' '}
            </p>
            <p>
              <strong>Recipient Zipcode:</strong> {country}
            </p>
            <p>
              <strong>Recipient Phone:</strong> {phone}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

TaskListView.propTypes = {
  tasks: PropTypes.array,
};

export default TaskListView;
