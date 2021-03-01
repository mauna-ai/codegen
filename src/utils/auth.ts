import {decrypt, encrypt, generateNonce, generateEncryptionKey} from "./crypto";
import {now} from "./date";

import type { encryptedString, encryptionKey} from "./crypto";

type authRequestData = {
  developer_id: number,
  token_payload: encryptedString
};

type tokenPayload = {
  timestamp: number,
  nonce: string
};

type authResponseData = {
  enc_token: encryptedString
};

type JWT = string;

export function encode(payload: tokenPayload, key: encryptionKey): encryptedString {
  const payloadJSON = JSON.stringify(payload);
  const encrypted: encryptedString = encrypt(payloadJSON, key);

  return encrypted;
}

export function decode(enc_token: encryptedString, key: encryptionKey): JWT {
  const jwt: JWT = decrypt(enc_token, key);

  return jwt;
}

export function createExchangeToken(apiKey: string): [encryptedString, string] {
  const timestamp = now();
  const nonce = generateNonce();
  const payload: tokenPayload = { timestamp, nonce };

  const key = generateEncryptionKey(apiKey, nonce);
  const exchangeToken = encode(payload, key);

  return [exchangeToken, nonce];
}

export function decodeJWT(response: authResponseData, apiKey: string, nonce: string): JWT {
  const key = generateEncryptionKey(apiKey, nonce);
  const {enc_token} = response;

  return decode(enc_token, key);
}