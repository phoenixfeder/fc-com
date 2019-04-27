export const BACKEND_URL = 'http://localhost:8080/';

export const BACKEND_URL_GETFLASHCARD = (id) => `${BACKEND_URL}flashcard/${id}`;
export const BACKEND_URL_REGISTER = `${BACKEND_URL}register/`;

export const BACKEND_URL_FLASHCARDBOXES = `${BACKEND_URL}flashcardbox/`;
export const BACKEND_URL_GET_FLASHCARDBOXES = `${BACKEND_URL_FLASHCARDBOXES}get`;
export const BACKEND_URL_CREATE_FLASHCARDBOX = `${BACKEND_URL_FLASHCARDBOXES}new`;
export const BACKEND_URL_DELETE_FLASHCARDBOX = `${BACKEND_URL_FLASHCARDBOXES}delete`;
export const BACKEND_URL_EDIT_FLASHCARDBOX = `${BACKEND_URL_FLASHCARDBOXES}edit`;

export const BACKEND_URL_ACCOUNT = `${BACKEND_URL}account/`;
export const BACKEND_URL_ACCOUNT_NEW = `${BACKEND_URL_ACCOUNT}new`;

/**
 * @return {string}
 */
export function BACKEND_URL_ACCOUNT_VERIFY(parameters) {
  return `${BACKEND_URL_ACCOUNT}verify?id=${parameters.id}&token=${parameters.token}`;
}

export const BACKEND_URL_ACCOUNT_NEW_VERIFICATION_TOKEN = `${BACKEND_URL_ACCOUNT}resettoken`;
export const BACKEND_URL_ACCOUNT_GET = `${BACKEND_URL_ACCOUNT}get`;
export const BACKEND_URL_ACCOUNT_UPDATE = `${BACKEND_URL_ACCOUNT}update`;
export const BACKEND_URL_ACCOUNT_CLOSE = `${BACKEND_URL_ACCOUNT}close`;

export const BACKEND_URL_EDIT_GET_ACCOUNT = `${BACKEND_URL}edit/getaccount`;

export const BACKEND_URL_EDIT_UPDATE_ACCOUNT = `${BACKEND_URL}edit/updateaccount`;
export const BACKEND_URL_EDIT_CLOSE_ACCOUNT = `${BACKEND_URL}edit/closeaccount`;

export const BACKEND_URL_LOGOUT = `${BACKEND_URL}'authentication/logout`;

export const BACKEND_URL_LOGIN = `${BACKEND_URL}authentication/login`;
