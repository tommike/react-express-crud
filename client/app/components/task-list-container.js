import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TaskListView from './task-list-view';

class TaskListContainer extends Component {
  render() {
    const { tasks, location } = this.props;
    const message = location.state && location.state.showSuccess ? location.state.showSuccess : '';

    return (
      <>
        {message && <p className="new-task-created">New task has been successfully created</p>}
        {Array.isArray(tasks) && tasks.length ? (
          <TaskListView tasks={tasks} />
        ) : (
          <p className="nothing-found">No tasks found</p>
        )}
      </>
    );
  }
}

TaskListContainer.propTypes = {
  location: PropTypes.object,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      delivery_at: PropTypes.string.isRequired,
      recipient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      }),
    })
  ),
};

const mapStateToProps = state => ({
  tasks: state.tasks,
});

export { TaskListContainer }; // export for unit testing

export default connect(mapStateToProps)(withRouter(TaskListContainer));
