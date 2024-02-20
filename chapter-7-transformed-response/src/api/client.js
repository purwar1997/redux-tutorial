export async function client(endpoint, body, customConfig) {
  const headers = { 'Content-Type': 'application/json' };

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
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        data,
      };
    }

    throw new Error(response.statusText ?? 'Request failed');
  } catch (error) {
    return Promise.reject(error.message);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, undefined, { method: 'GET', ...customConfig });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, body, { method: 'POST', ...customConfig });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, body, { method: 'PUT', ...customConfig });
};

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, undefined, { method: 'DELETE', ...customConfig });
};
