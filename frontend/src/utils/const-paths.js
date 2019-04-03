export const BACKEND_URL = 'http://localhost:8080/';

export const BACKEND_URL_GETFLASHCARD = (id) => `${BACKEND_URL}flashcard/${id}`;
export const BACKEND_URL_REGISTER = () => `${BACKEND_URL}register/`;

export const BACKEND_URL_ACCOUNT = `${BACKEND_URL}account/`;
export const BACKEND_URL_ACCOUNT_NEW = `${BACKEND_URL_ACCOUNT}new`;

export function BACKEND_URL_ACCOUNT_VERIFY(parameters) {
  console.log(parameters);
  return `${BACKEND_URL_ACCOUNT}verify?id=${parameters.id}&token=${parameters.token}`;
}

export const BACKEND_URL_REGISTER_NEW_VERIFICATION_TOKEN = `${BACKEND_URL_REGISTER}/sendnewtoken`;
