// @flow
import { COMMENT_KEYS, INHERIT_KEYS } from "./constants";
import { inheritsComments } from "./comments";
import { memberExpression } from "./generated/helpers";
import { traverseFast } from "./traverse";

/**
 * Append a node to a member expression.
 */
export function appendToMemberExpression(
  member: Object,
  append: Object,
  computed?: boolean,
): Object {
  member.object = memberExpression(
    member.object,
    member.property,
    member.computed,
  );
  member.property = append;
  member.computed = !!computed;
  return member;
}

/**
 * Prepend a node to a member expression.
 */
export function prependToMemberExpression(
  member: Object,
  prepend: Object,
): Object {
  member.object = memberExpression(prepend, member.object);
  return member;
}

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */

export function inherits(child: Object, parent: Object): Object {
  if (!child || !parent) return child;

  // optionally inherit specific properties if not null
  for (const key of (INHERIT_KEYS.optional: Array<string>)) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  // force inherit "private" properties
  for (const key in parent) {
    if (key[0] === "_" && key !== "__clone") child[key] = parent[key];
  }

  // force inherit select properties
  for (const key of (INHERIT_KEYS.force: Array<string>)) {
    child[key] = parent[key];
  }

  inheritsComments(child, parent);

  return child;
}

const CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];

const CLEAR_KEYS_PLUS_COMMENTS = COMMENT_KEYS.concat(["comments"]).concat(
  CLEAR_KEYS,
);

/**
 * Remove all of the _* properties from a node along with the additional metadata
 * properties like location data and raw token data.
 */

export function removeProperties(node: Node, opts?: Object): void {
  opts = opts || {};
  const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (const key of map) {
    if (node[key] != null) node[key] = undefined;
  }

  for (const key in node) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  const syms: Array<Symbol> = Object.getOwnPropertySymbols(node);
  for (const sym of syms) {
    node[sym] = null;
  }
}

export function removePropertiesDeep(tree: Node, opts?: Object): Node {
  traverseFast(tree, removeProperties, opts);
  return tree;
}
