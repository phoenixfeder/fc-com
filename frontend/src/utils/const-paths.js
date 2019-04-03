export const BACKEND_URL = 'http://localhost:8080/';

export const BACKEND_URL_GETFLASHCARD = (id) => `${BACKEND_URL}flashcard/${id}`;
export const BACKEND_URL_REGISTER = () => `${BACKEND_URL}register/`;

export const BACKEND_URL_ACCOUNT = `${BACKEND_URL}register/`;
export const BACKEND_URL_ACCOUNT_NEW = `${BACKEND_URL_ACCOUNT}newuser`;
export const BACKEND_URL_ACCOUNT_VERIFY = `${BACKEND_URL_ACCOUNT}verify`;
