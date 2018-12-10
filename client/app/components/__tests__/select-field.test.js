import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectField from '../select-field';

let props;
let wrapper;
describe('<SelectField>', () => {
  beforeEach(() => {
    props = {
      name: 'random-name',
      label: 'random-label',
      options: [{ id: 'spain', name: 'Spain' }, { id: 'usa', name: 'USA' }],
      optionSelected: 'spain',
      onChange: () => {},
      required: true,
    };

    wrapper = shallow(<SelectField {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders label text', () => {
    expect(wrapper.find('label').text()).toContain(props.label);
  });

  it('renders "name" attribute', () => {
    expect(wrapper.find('select').props().name).toBe(props.name);
  });

  it('renders "required" attribute', () => {
    expect(wrapper.find('select').props().required).toBe(props.required);
  });

  it('renders all provided options', () => {
    expect(wrapper.find('option')).toHaveLength(props.options.length + 2); // First option is Please select, additional is hardcoded Austria
  });

  it('renders text/id of option', () => { // First option is Please select
    const firstOption = wrapper.find('option').at(1);
    expect(firstOption.props().value).toBe(props.options[0].id);
    expect(firstOption.text()).toBe(props.options[0].name);
  });

  it('preselects correct option', () => {
    props.optionSelected = 'usa';
    wrapper = shallow(<SelectField {...props} />);
    expect(wrapper.find('select').props().value).toBe('usa');
  });

  it('render * sign if field is required', () => {
    expect(wrapper.find('.form__sign--required')).toHaveLength(1);
  });

  it('does not render * sign if field is not required', () => {
    props.required = false;
    wrapper = shallow(<SelectField {...props} />);
    expect(wrapper.find('.form__sign--required')).toHaveLength(0);
  });

  it('triggers "onChange" function', () => {
    const callback = jest.fn();
    props.onChange = callback;
    wrapper = mount(<SelectField {...props} />);

    wrapper.find('select').simulate('change');
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);
  });
});
