const API_BASE = "http://127.0.0.1:8000/api";

export const FormDataPostFetch = async ({ url, body, headers = {} }) => {
  const res = await fetch(`${API_BASE}/${url}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      ...headers, 
    },
    body,
  });

  return handleResponse(res);
};

// 🟡 Update (PUT)
export const FormDataPutFetch = async ({ url, body, headers = {} }) => {

  body.append("_method", "PUT");

  const res = await fetch(`${API_BASE}/${url}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      ...headers,
    },
    body,
  });

  return handleResponse(res);
};



const handleResponse = async (res) => {
  if (res.status === 204) {
    return { success: true, message: "No content (204)" };
  }

  try {
    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: "Invalid JSON response" };
  }
};