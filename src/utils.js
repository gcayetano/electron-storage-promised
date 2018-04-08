exports._getDeepObjectKeyValue = (array, object) => {
  if (Array.isArray(array)) {
    let result = object;

    for (let i = 0, l = array.length; i < l; i++) {
      result = result[array[i]];
    }

    if (result) {
      return result;
    }
    return null;
  }
  return null;
};

exports._setDeepObjectKeyValue = (array, object, value) => {
  if (Array.isArray(array)) {
    let result = object;
    const ref = result;

    for (let i = 0, l = array.length; i < l - 1; i++) {
      if (!result[array[i]]) result[array[i]] = {};
      result = result[array[i]];
    }

    result[array[array.length - 1]] = value;

    return ref;
  }
  return null;
};
