const API_BASE = "http://127.0.0.1:8000/api";

const getFetch = async ({ url, headers = {} }) => {
  const res = await fetch(`${API_BASE}/${url}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  return await res.json();
};

const postFetch = async ({ url, body, headers = {} }) => {
  const res = await fetch(`${API_BASE}/${url}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body), 
  });

  if (res.status === 204) {
    return { success: true, message: "No content (204)" };
  }
  
  return await res.json();
};

const putFetch = async ({ url, body, headers = {} }) => {
  const res = await fetch(`${API_BASE}/${url}`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  if (res.status === 204) {
    return { success: true, message: "No content (204)" };
  }
  return await res.json();
};

const deleteFetch = async ({ url, headers = {} }) => {
  const res = await fetch(`${API_BASE}/${url}`, {
    method: "DELETE",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });
  if (res.status === 204) {
    return { success: true, message: "Deleted successfuly" };
  }

  return await res.json()
};

export { getFetch, postFetch, putFetch, deleteFetch };