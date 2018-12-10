import React from 'react';
import TaskListContainerConnected from './task-list-container';

const TaskListPage = () => (
  <main className="page">
    <h1 className="page__title">Tasks</h1>
    <TaskListContainerConnected />
  </main>
);

export default TaskListPage;
