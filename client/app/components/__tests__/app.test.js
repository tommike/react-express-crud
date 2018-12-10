import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AppConnected from '../app';

const mockStore = configureMockStore([])({
  dataLoading: false,
  dispatch: () => {},
});

describe('<App/>', () => {
  it('renders without throwing an error', () => {
    const wrapper = shallow(
      <Provider store={mockStore}>
        <AppConnected />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
