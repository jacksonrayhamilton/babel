// @flow
/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */
export function clone(node: Object): Object {
  if (!node) return node;
  const newNode = {};
  for (const key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */
export function cloneWithoutLoc(node: Object): Object {
  const newNode = clone(node);
  newNode.loc = null;
  return newNode;
}

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * exluding `_private` properties.
 */
export function cloneDeep(node: Object): Object {
  if (!node) return node;
  const newNode = {};

  for (const key in node) {
    if (key[0] === "_") continue;

    let val = node[key];

    if (val) {
      if (val.type) {
        val = cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(cloneDeep);
      }
    }

    newNode[key] = val;
  }

  return newNode;
}
