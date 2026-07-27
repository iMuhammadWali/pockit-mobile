import { sendRequest } from "./client";

export async function loginRequest(email, password) {
  return await sendRequest("auth/login", "POST", {
    body: {
      email,
      password,
    },
  });
}

export async function registerRequest(username, email, password) {
  await sendRequest("auth/register", "POST", {
    body: {
      username,
      email,
      password,
    },
  });
}

export async function registerAndLogin(username, email, password) {
  await registerRequest(username, email, password);
  return await loginRequest(email, password);
}

export async function rotateTokenRequest(refreshToken) {
  return await sendRequest("auth/rotate", "POST", {
    body: {
      refreshToken,
    },
  });
}

