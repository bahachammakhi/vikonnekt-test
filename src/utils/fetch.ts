enum METHODS {
  POST = "POST",
  GET = "GET",
}

async function fetchCall<Data>(
  url: string,
  method: METHODS,
  headers: HeadersInit,
  body?: BodyInit
): Promise<Data> {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
    },
    body,
  });
  return response.json();
}

const methods = {
  get: function <Data>(url: string, headers?: HeadersInit) {
    return fetchCall<Data>(url, METHODS.GET, headers || {});
  },
};

export default methods;
