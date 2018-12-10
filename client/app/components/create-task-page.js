import React from 'react';
import TasksFormContainer from './tasks-form';

const CreateTaskPage = () => (
  <main className="page">
    <h1 className="page__title">New Task</h1>
    <TasksFormContainer />
  </main>
);

export default CreateTaskPage;
