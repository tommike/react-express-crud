import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleInitialData } from '../actions/shared';
import TaskListPage from './task-list-page';
import CreateTaskPage from './create-task-page';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { dataLoading } = this.props;
    if (dataLoading === true) {
      return <h3 className="app-loading">Loading</h3>;
    }
    return (
      <Router>
        <Switch>
          <Route path="/" key="create-task-page" exact component={CreateTaskPage} />
          <Route path="/task-list" key="task-list-pages" component={TaskListPage} />
          <Route render={() => <p className="page-not-found">Page not found</p>} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dataLoading: state.dataLoading,
});

export default connect(mapStateToProps)(App);
