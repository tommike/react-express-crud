/* eslint-disable camelcase */
import React from 'react';
import { shallow } from 'enzyme';
import TaskListView from '../task-list-view';

let props;
let wrapper;
describe('<TaskListView>', () => {
  beforeEach(() => {
    props = {
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

    wrapper = shallow(<TaskListView {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders all provided tasks', () => {
    expect(wrapper.find('.tasks-list__item')).toHaveLength(props.tasks.length);
  });

  it('task displays all data', () => {
    const {
      recipient: { name, street, zipcode, city, state, country, phone },
      delivery_at,
    } = props.tasks[0];

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(delivery_at);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(name);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(street);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(zipcode);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(city);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(state);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(country);

    expect(
      wrapper
        .find('.tasks-list__item')
        .at(0)
        .text()
    ).toContain(phone);
  });
});
