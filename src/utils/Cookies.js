import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default {
  setCookie: (name, value) => {
    return cookies.set(name, value);
  },

  hasCookie: (name) => {
    return !!cookies.get(name);
  },

  getCookie: (name) => {
    return cookies.get(name);
  },

  removeCookie: (name) => {
    cookies.remove(name);
  },

  raw: cookies,
};
