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
