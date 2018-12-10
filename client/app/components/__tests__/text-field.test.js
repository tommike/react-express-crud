import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from '../text-field';

let props;
let wrapper;
describe('<TextField>', () => {
  beforeEach(() => {
    props = {
      name: 'random-name',
      label: 'random-label',
      placeholder: 'random-placeholder',
      value: 'random-value',
      onChange: () => {},
      required: true,
      autocomplete: 'off',
    };

    wrapper = shallow(<TextField {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders label text', () => {
    expect(wrapper.find('label').text()).toContain(props.label);
  });

  it('renders "name" attribute', () => {
    expect(wrapper.find('input').props().name).toBe(props.name);
  });

  it('renders "placeholder" attribute', () => {
    expect(wrapper.find('input').props().placeholder).toBe(props.placeholder);
  });

  it('renders "value" attribute', () => {
    expect(wrapper.find('input').props().value).toBe(props.value);
  });

  it('renders "required" attribute', () => {
    expect(wrapper.find('input').props().required).toBe(props.required);
  });

  it('renders "autoComplete" attribute', () => {
    expect(wrapper.find('input').props().autoComplete).toBe(props.autocomplete);
  });

  it('render * sign if field is required', () => {
    expect(wrapper.find('.form__sign--required')).toHaveLength(1);
  });

  it('does not render * sign if field is not required', () => {
    props.required = false;
    wrapper = shallow(<TextField {...props} />);
    expect(wrapper.find('.form__sign--required')).toHaveLength(0);
  });

  it('triggers "onChange" function', () => {
    const callback = jest.fn();
    props.onChange = callback;
    wrapper = mount(<TextField {...props} />);

    wrapper.find('input').simulate('change');
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);
  });
});
