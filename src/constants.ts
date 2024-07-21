export const API_URL = process.env.REACT_APP_API_URL;

export const AUTH_ENDPOINT = {
    LOGIN: `/auth/login`,
    SIGNUP: `/auth/signup`,
    GOOGLE_AUTH: `/auth/google`,
}

export const GOOGLE_CLIENT_KEY = process.env.REACT_APP_GOOGLE_CLIENT_KEY ?? '';

export const TASK_ENDPOINT = {
    GET_ALL: `/task`,
    CREATE: `/task`,
    UPDATE: `/task`,
    DELETE: `/task`,
    CHANGE_STATUS: `/task`,
}

export const LOCAL_STORAGE_USER_KEY = 'user';

export const TASK_STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
}