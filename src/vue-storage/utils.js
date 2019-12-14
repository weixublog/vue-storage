const canBeJson = (str) => {
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
};

const toString = (json) => (typeof json === 'object' ? JSON.stringify(json) : json);
const toJSON = (str) => (canBeJson(str) ? JSON.parse(str) : str);
const uuid = (key = '') => `${Date.now().toString(36)}${Math.random().toString(36)}${key}`;

export {
  canBeJson,
  toString,
  toJSON,
  uuid,
};
