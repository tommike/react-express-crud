/* eslint-disable camelcase */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { TaskListContainer } from '../task-list-container';
import TaskListView from '../task-list-view';

let props;
let wrapper;

describe('<TaskListContainer>', () => {
  beforeEach(() => {
    props = {
      location: {state:{}},
      tasks: [
        {
          recipient: {
            name: 'name1',
            street: 'street1',
            zipcode: 'zipcode1',
            city: 'city1',
            state: 'state1',
            country: 'country1',
            phone: 'phone1',
          },
          delivery_at: '08:08:2018 08:08',
        },
        {
          recipient: {
            name: 'name2',
            street: 'street2',
            zipcode: 'zipcode2',
            city: 'city2',
            state: 'state2',
            country: 'country2',
            phone: 'phone2',
          },
          delivery_at: '07:07:2017 07:07',
        },
      ],
    };

    wrapper = shallow(<TaskListContainer {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('does not render success message if there is no location.state', () => {
    expect(wrapper.find('.new-task-created')).toHaveLength(0);
  });

  it('renders success message if there is location.state.showSuccess', () => {
    props.location.state.showSuccess = true;
    wrapper = shallow(<TaskListContainer {...props} />);
    expect(wrapper.find('.new-task-created')).toHaveLength(1);
  });

  it('renders <TaskListView> component if tasks array is provided', () => {
    props.location.state.showSuccess = true;
    wrapper = shallow(<TaskListContainer {...props} />);
    expect(wrapper.find(TaskListView)).toHaveLength(1);
  });

  it('renders "No items found" if tasks array is empty', () => {
    props.tasks = [];
    wrapper = shallow(<TaskListContainer {...props} />);
    expect(wrapper.find('.nothing-found')).toHaveLength(1);
  });

  it('renders "No items found" if tasks != array', () => {
    props.tasks = {};
    wrapper = shallow(<TaskListContainer {...props} />);
    expect(wrapper.find('.nothing-found')).toHaveLength(1);

    props.tasks = null;
    wrapper = shallow(<TaskListContainer {...props} />);
    expect(wrapper.find('.nothing-found')).toHaveLength(1);
  });

});