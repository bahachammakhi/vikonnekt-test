enum METHODS {
  POST = "POST",
  GET = "GET",
}

async function fetchCall(
  url: string,
  method: METHODS,
  headers: HeadersInit,
  body?: BodyInit
) {
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
  get: (url: string, headers?: HeadersInit) =>
    fetchCall(url, METHODS.GET, headers || {}),
};

export default methods;
