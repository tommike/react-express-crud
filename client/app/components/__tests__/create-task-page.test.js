import React from 'react';
import { shallow } from 'enzyme';
import CreateTaskPAge from '../create-task-page';

let props;
let wrapper;
describe('<CreateTaskPAge>', () => {
  beforeEach(() => {
    wrapper = shallow(<CreateTaskPAge {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });
});
