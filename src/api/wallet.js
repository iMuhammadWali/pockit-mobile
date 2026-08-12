import { getAccessToken } from "../utils/tokenStore.js";
import { sendRequest } from "./client.js";

export async function createWallet(walletName, initialBalance) {
  const accessToken = getAccessToken();
  return await sendRequest("wallet", "POST", {
    body: {
      name: walletName,
      balance: parseFloat(initialBalance),
    },
  }, accessToken);
}

export async function getAllWallets() {
  const accessToken = getAccessToken();
  return await sendRequest("wallets", "GET", {}, accessToken);
}