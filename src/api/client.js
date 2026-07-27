let accessToken = "";
const REQUEST_TIMEOUT_MS = 10000;

export async function sendRequest(path, method, options, accessToken) {
  const headers = {};
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (options.headers) {
    for (const key in options.headers) {
      headers[key] = options.headers[key];
    }
  }

  const requestConfig = {
    method,
    headers,
  };

  if (options.body) {
    requestConfig.body = JSON.stringify(options.body);
  }

  const apiEndpoint = `${process.env.EXPO_PUBLIC_BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiEndpoint, requestConfig);
    const data = await response.json();
    // Need to handle server error codes here man.
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Is the server running?");
    }
    // console.error("Server error: ", err);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// Since auth does not need a rotate request, I will write this later and test the send Request for now.
export function apiRequest() {}
