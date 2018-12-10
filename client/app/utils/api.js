const API = {};

function handleJSONResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    }

    return Promise.reject(
      Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText,
      })
    );
  });
}

API.saveTask = function(data) {
  return fetch('http://localhost:5000/tasks', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleJSONResponse)
    .then(savedData => savedData)
    .catch(error => Promise.reject(error.error || error.statusText));
};

API.fetchTasks = function() {
  return fetch('http://localhost:5000/tasks', {
    method: 'GET',
    mode: 'cors',
  })
    .then(handleJSONResponse)
    .then(incoingData => incoingData)
    .catch(error => Promise.reject(error.error || error.statusText));
};

API.fetchCountries = function() {
  return fetch('http://localhost:5000/countries', {
    method: 'GET',
    mode: 'cors',
  })
    .then(handleJSONResponse)
    .then(incoingData => incoingData)
    .catch(error => Promise.reject(error.error || error.statusText));
};

export function getInitialData() {
  return Promise.all([API.fetchTasks(), API.fetchCountries()]).then(([tasks, countries]) => ({
    tasks,
    countries,
  }));
  // todo: add catch case here in case tasks/countries endpoint is not accessible
}

export default API;
