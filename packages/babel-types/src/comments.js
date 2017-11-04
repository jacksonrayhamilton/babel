// @flow
import uniq from "lodash/uniq";
import { COMMENT_KEYS } from "./constants";

/**
 * Add comment of certain type to a node.
 */
export function addComment(
  node: Object,
  type: string,
  content: string,
  line?: boolean,
): Object {
  return addComments(node, type, [
    {
      type: line ? "CommentLine" : "CommentBlock",
      value: content,
    },
  ]);
}

/**
 * Add comments of certain type to a node.
 */
export function addComments(
  node: Object,
  type: string,
  comments: Array<Object>,
): Object {
  if (!comments || !node) return node;

  const key = `${type}Comments`;

  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key] = node[key].concat(comments);
    }
  } else {
    node[key] = comments;
  }

  return node;
}

/**
 * Remove comment properties from a node.
 */
export function removeComments(node: Object): Object {
  COMMENT_KEYS.forEach(key => {
    node[key] = null;
  });

  return node;
}

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */
export function inheritsComments(child: Object, parent: Object): Object {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);

  return child;
}

export function inheritTrailingComments(child: Object, parent: Object): void {
  inherit("trailingComments", child, parent);
}

export function inheritLeadingComments(child: Object, parent: Object): void {
  inherit("leadingComments", child, parent);
}

export function inheritInnerComments(child: Object, parent: Object): void {
  inherit("innerComments", child, parent);
}

function inherit(key: string, child: Object, parent: Object): void {
  if (child && parent) {
    child[key] = uniq([].concat(child[key], parent[key]).filter(Boolean));
  }
}
