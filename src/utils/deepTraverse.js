const SUPPORTED_SLATE_SET_OBJECTS = [
  'document',
  'block',
  'text',
  'character'
]

const SUPPORTED_SLATE_PATH_OBJECTS = [
  'nodes',
  'characters'
]

var path = require('../intelie_diff/path');
var concatPath = path.concat, escape = path.escape;


export const deepTraverse = (obj, p, pathMap) => {
  let path = p || ''
  const isList = obj instanceof Array

  // Iterate object keys instead
  if (!isList) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (SUPPORTED_SLATE_PATH_OBJECTS.includes(key)) {
          const thisPath = concatPath(path, escape(key))
          pathMap[obj[key]._objectId] = thisPath
          deepTraverse(obj[key], thisPath, pathMap)
        }
      }
    }
  }
  else {
    // Assumed to be a list
    obj.forEach((value, key) => {
      const thisPath = concatPath(path, escape(key))
      pathMap[value._objectId] = thisPath
      deepTraverse(value, thisPath, pathMap)
    });
  }

  return pathMap
}