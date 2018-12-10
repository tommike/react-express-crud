const API = {};

API.saveTask = function() {
  return Promise.resolve({
    recipient: {
      name: 'name',
      street: 'street',
      zipcode: 'zipcode',
      city: 'city',
      state: 'state',
      country: 'germany',
      phone: 'phone',
    },
    delivery_at: '12:12:2018 11:11',
  });
};

API.fetchCountries = function() {
  return Promise.resolve([
    { id: 'germany', name: 'Germany' },
    { id: 'netherlands', name: 'Netherlands' },
  ]);
};

API.fetchTasks = function() {
  return Promise.resolve([
    {
      recipient: {
        name: 'name',
        street: 'street',
        zipcode: 'zipcode',
        city: 'city',
        state: 'state',
        country: 'germany',
        phone: 'phone',
      },
      delivery_at: '12:12:2018 11:11',
    },
  ]);
};
export default API;
