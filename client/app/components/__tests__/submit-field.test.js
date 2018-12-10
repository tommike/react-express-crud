import React from 'react';
import { shallow } from 'enzyme';
import SubmitField from '../submit-field';

let props;
let wrapper;
describe('<SubmitField>', () => {
  beforeEach(() => {
    props = {
      disabled: true,
    };

    wrapper = shallow(<SubmitField {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders "disabled" attribute', () => {
    expect(wrapper.find('button').props().disabled).toBe(props.disabled);
  });
});
