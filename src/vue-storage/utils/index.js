export const isJson = (str) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      return typeof obj === 'object' && obj;
    }
    catch (e) {
      return false;
    }
  }
  return false;
}

export const toString = (json) => (typeof json === 'object' ? JSON.stringify(json) : json);

export const toJSON = (str) => (isJson(str) ? JSON.parse(str) : str);

export const uuid = () =>
  (Date.now().toString(36) + (((1 + Math.random()) * 0x100000) | 0)
    .toString(16).substring(1))
    .toUpperCase();
