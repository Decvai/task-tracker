import { API_URL } from '../../config';
import { User } from '../../models/User';

export interface AuthFetchResponse {
  token: string;
  user: User;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export type RegistrationData = AuthCredentials & { nickname: string };

export const fetchLogin = async (
  email: string,
  password: string
): Promise<AuthFetchResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: AuthFetchResponse = await response.json();
  return data;
};

export const fetchAuth = async (token: string): Promise<AuthFetchResponse> => {
  const response = await fetch(`${API_URL}/api/auth/authorization`, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: AuthFetchResponse = await response.json();
  return data;
};

export const fetchRegistration = async (
  userInfo: RegistrationData
): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/auth/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return true;
};
