export async function client(endpoint, { body, ...customConfig }) {
  const headers = { 'content-type': 'application/json' };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        headers: response.headers,
        url: response.url,
        data,
      };
    }

    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : 'Failed request');
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: 'POST' });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: 'PUT' });
};

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE' });
};
