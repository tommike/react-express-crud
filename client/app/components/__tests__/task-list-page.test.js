import React from 'react';
import { shallow } from 'enzyme';
import TaskListPage from '../task-list-page';

let props;
let wrapper;
describe('<TaskListPage>', () => {
  beforeEach(() => {
    wrapper = shallow(<TaskListPage {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });
});
