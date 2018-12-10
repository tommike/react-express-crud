/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { TasksForm } from '../tasks-form';
import * as tasks from '../../actions/tasks';

let props;
let wrapper;
let postData;

describe('<TaskForm />', () => {
  beforeEach(() => {
    props = {
      dispatch: () => {},
      history: {
        push: () => {},
      },
      availableCountries: [{ id: 'spain', name: 'Spain' }, { id: 'usa', name: 'USA' }],
    };

    window.scroll = jest.fn();

    wrapper = shallow(<TasksForm {...props} />);

    postData = {
      delivery_at: '08:08:2012 12:12',
      recipient: {
        name: 'test',
        street: 'test',
        city: 'test',
        state: 'test',
        country: 'test',
        zipcode: 'test',
        phone: 'spain',
      },
    };
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('triggers handleChange when text field is changed', async () => {
    const spy = jest.spyOn(TasksForm.prototype, 'handleChange');
    wrapper = mount(<TasksForm {...props} />);

    await wrapper
      .find('input[type="text"]')
      .at(0)
      .simulate('change', { target: { value: 'test' } });

    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
  });

  it('handleChange function updates state and field value of TextField', async () => {
    wrapper = mount(<TasksForm {...props} />);

    const firstTextField = wrapper.find('input[type="text"]').at(0);
    const fieldName = firstTextField.props().name;
    await firstTextField.simulate('change', { target: { name: fieldName, value: 'test' } });

    expect(
      wrapper
        .find('input[type="text"]')
        .at(0)
        .props().value
    ).toBe('test');
    expect(wrapper.state()[fieldName]).toBe('test');
  });

  it('triggers handleChange when <select> field is changed', async () => {
    const spy = jest.spyOn(TasksForm.prototype, 'handleChange');
    wrapper = mount(<TasksForm {...props} />);

    await wrapper
      .find('select')
      .at(0)
      .simulate('change', { target: { value: 'test' } });

    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
  });

  it('handleChange function updates state and value of SelectField', async () => {
    wrapper = mount(<TasksForm {...props} />);

    const firstTextField = wrapper.find('select').at(0);
    const fieldName = firstTextField.props().name;
    await firstTextField.simulate('change', { target: { name: fieldName, value: 'spain' } });

    expect(
      wrapper
        .find('select')
        .at(0)
        .props().value
    ).toBe('spain');
    expect(wrapper.state()[fieldName]).toBe('spain');
  });

  it('submit button is disabled by default', () => {
    wrapper = mount(<TasksForm {...props} />);
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('submit button is enabled when user fills in mandatory fields', () => {
    wrapper = mount(<TasksForm {...props} />);

    wrapper
      .find('input[name="deliveryAt"]')
      .simulate('change', { target: { value: postData.delivery_at, name: 'deliveryAt' } });

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { value: postData.recipient.name, name: 'name' } });

    wrapper
      .find('input[name="street"]')
      .simulate('change', { target: { value: postData.recipient.street, name: 'street' } });
    wrapper
      .find('input[name="city"]')
      .simulate('change', { target: { value: postData.recipient.city, name: 'city' } });

    wrapper
      .find('input[name="state"]')
      .simulate('change', { target: { value: postData.recipient.state, name: 'state' } });

    wrapper
      .find('select[name="country"]')
      .simulate('change', { target: { value: postData.recipient.country, name: 'country' } });

    wrapper
      .find('input[name="zipcode"]')
      .simulate('change', { target: { value: postData.recipient.zipcode, name: 'zipcode' } });

    wrapper
      .find('input[name="phone"]')
      .simulate('change', { target: { value: postData.recipient.phone, name: 'phone' } });

    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(false);
  });

  it('handleSubmit dispatches data in correct object shape', async () => {
    const spy = jest.spyOn(tasks, 'handleAddTask');
    wrapper = mount(<TasksForm {...props} />);

    wrapper
      .find('input[name="deliveryAt"]')
      .simulate('change', { target: { value: postData.delivery_at, name: 'deliveryAt' } });

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { value: postData.recipient.name, name: 'name' } });

    wrapper
      .find('input[name="street"]')
      .simulate('change', { target: { value: postData.recipient.street, name: 'street' } });
    wrapper
      .find('input[name="city"]')
      .simulate('change', { target: { value: postData.recipient.city, name: 'city' } });

    wrapper
      .find('input[name="state"]')
      .simulate('change', { target: { value: postData.recipient.state, name: 'state' } });

    wrapper
      .find('select[name="country"]')
      .simulate('change', { target: { value: postData.recipient.country, name: 'country' } });

    wrapper
      .find('input[name="zipcode"]')
      .simulate('change', { target: { value: postData.recipient.zipcode, name: 'zipcode' } });

    wrapper
      .find('input[name="phone"]')
      .simulate('change', { target: { value: postData.recipient.phone, name: 'phone' } });

    await wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(spy).toBeCalledWith(postData, wrapper.instance().afterSubmit);
  });

  it('error message is shown if form is not successfully saved', () => {
    wrapper.instance().afterSubmit(false, 'test demo message');
    expect(wrapper.find('.form-feedback--error')).toHaveLength(1);
    expect(wrapper.find('.form-feedback--error').text()).toContain('test demo message');
  });

  it('on form error browser scrolls to top of the window to bring error message intro view', () => {
    wrapper.instance().afterSubmit(false, 'test demo message');
    expect(window.scroll).toBeCalledTimes(1);
  });

  it('page redirects to task list view if request is successfully saved', () => {
    const spy = jest.spyOn(props.history, 'push');
    wrapper.instance().afterSubmit(true);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({ pathname: '/task-list', state: { showSuccess: true } });
  });
});
