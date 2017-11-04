// @flow
import { getBindingIdentifiers } from "./retrievers";
import {
  isVariableDeclaration,
  isFunction,
  isIdentifier,
  isCatchClause,
  isClassDeclaration,
  isImportDefaultSpecifier,
  isBlockStatement,
  isFunctionDeclaration,
  isScopable,
  isMemberExpression,
  isStringLiteral,
} from "./generated/helpers";
import { NODE_FIELDS, VISITOR_KEYS } from "./definitions";
import { BLOCK_SCOPED_SYMBOL, RESERVED_WORDS_ES3_ONLY } from "./constants";
import isType from "./validators/isType";
import isValidIdentifier from "./validators/isValidIdentifier";

export function validate(node?: Object, key: string, val: any) {
  if (!node) return;

  const fields = NODE_FIELDS[node.type];
  if (!fields) return;

  const field = fields[key];
  if (!field || !field.validate) return;
  if (field.optional && val == null) return;

  field.validate(node, key, val);
}

export function isNode(node?: Object): boolean {
  return !!(node && VISITOR_KEYS[node.type]);
}

export function assertNode(node?: Object): void {
  if (!isNode(node)) {
    const type = (node && node.type) || JSON.stringify(node);
    throw new TypeError(`Not a valid node "${type}"`);
  }
}

/**
 * Check if the input `node` is a binding identifier.
 */

export function isBinding(node: Object, parent: Object): boolean {
  const keys = getBindingIdentifiers.keys[parent.type];
  if (keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return true;
      } else {
        if (val === node) return true;
      }
    }
  }

  return false;
}

/**
 * Check if the input `node` is a reference to a bound variable.
 */

export function isReferenced(node: Object, parent: Object): boolean {
  switch (parent.type) {
    // yes: object::NODE
    // yes: NODE::callee
    case "BindExpression":
      return parent.object === node || parent.callee === node;

    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "JSXMemberExpression":
      if (parent.property === node && parent.computed) {
        return true;
      } else if (parent.object === node) {
        return true;
      } else {
        return false;
      }

    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;

    // yes: { [NODE]: "" }
    // yes: { NODE }
    // no: { NODE: "" }
    case "ObjectProperty":
      if (parent.key === node) {
        return parent.computed;
      }

    // no: let NODE = init;
    // yes: let id = NODE;
    case "VariableDeclarator":
      return parent.id !== node;

    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "ArrowFunctionExpression":
    case "FunctionDeclaration":
    case "FunctionExpression":
      for (const param of (parent.params: Array<any>)) {
        if (param === node) return false;
      }

      return parent.id !== node;

    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      if (parent.source) {
        return false;
      } else {
        return parent.local === node;
      }

    // no: export NODE from "foo";
    // no: export * as NODE from "foo";
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;

    // no: <div NODE="foo" />
    case "JSXAttribute":
      return parent.name !== node;

    // no: class { NODE = value; }
    // yes: class { [NODE] = value; }
    // yes: class { key = NODE; }
    case "ClassProperty":
      if (parent.key === node) {
        return parent.computed;
      } else {
        return parent.value === node;
      }

    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;

    // no: class NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.id !== node;

    // yes: class { [NODE]() {} }
    case "ClassMethod":
    case "ObjectMethod":
      return parent.key === node && parent.computed;

    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;

    // no: try {} catch (NODE) {}
    case "CatchClause":
      return parent.param !== node;

    // no: function foo(...NODE) {}
    case "RestElement":
      return false;

    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return parent.right === node;

    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return parent.right === node;

    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
  }

  return true;
}

/**
 * Check if the input `name` is a valid identifier name according to the ES3 specification.
 *
 * Additional ES3 reserved words are
 */
export function isValidES3Identifier(name: string): boolean {
  return isValidIdentifier(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
}

/**
 * Check if the input `node` is a `let` variable declaration.
 */

export function isLet(node: Object): boolean {
  return (
    isVariableDeclaration(node) &&
    (node.kind !== "var" || node[BLOCK_SCOPED_SYMBOL])
  );
}

/**
 * Check if the input `node` is block scoped.
 */

export function isBlockScoped(node: Object): boolean {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}

/**
 * Check if the input `node` is a variable declaration.
 */

export function isVar(node: Object): boolean {
  return (
    isVariableDeclaration(node, { kind: "var" }) && !node[BLOCK_SCOPED_SYMBOL]
  );
}

/**
 * Check if the input `specifier` is a `default` import or export.
 */

export function isSpecifierDefault(specifier: Object): boolean {
  return (
    isImportDefaultSpecifier(specifier) ||
    isIdentifier(specifier.imported || specifier.exported, {
      name: "default",
    })
  );
}

/**
 * Check if the input `node` is a scope.
 */

export function isScope(node: Object, parent: Object): boolean {
  if (isBlockStatement(node) && isFunction(parent, { body: node })) {
    return false;
  }

  if (isBlockStatement(node) && isCatchClause(parent, { body: node })) {
    return false;
  }

  return isScopable(node);
}

/**
 * Check if the input `node` is definitely immutable.
 */

export function isImmutable(node: Object): boolean {
  if (isType(node.type, "Immutable")) return true;

  if (isIdentifier(node)) {
    if (node.name === "undefined") {
      // immutable!
      return true;
    } else {
      // no idea...
      return false;
    }
  }

  return false;
}

/**
 * Check if two nodes are equivalent
 */
export function isNodesEquivalent(a: any, b: any) {
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a == null ||
    b == null
  ) {
    return a === b;
  }

  if (a.type !== b.type) {
    return false;
  }

  const fields = Object.keys(NODE_FIELDS[a.type] || a.type);

  for (const field of fields) {
    if (typeof a[field] !== typeof b[field]) {
      return false;
    }

    if (Array.isArray(a[field])) {
      if (!Array.isArray(b[field])) {
        return false;
      }
      if (a[field].length !== b[field].length) {
        return false;
      }

      for (let i = 0; i < a[field].length; i++) {
        if (!isNodesEquivalent(a[field][i], b[field][i])) {
          return false;
        }
      }
      continue;
    }

    if (!isNodesEquivalent(a[field], b[field])) {
      return false;
    }
  }

  return true;
}

/**
 * Determines whether or not the input node `member` matches the
 * input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
export function matchesPattern(
  member: Object,
  match: string | Array<string>,
  allowPartial?: boolean,
): boolean {
  // not a member expression
  if (!isMemberExpression(member)) return false;

  const parts = Array.isArray(match) ? match : match.split(".");
  const nodes = [];

  let node;
  for (node = member; isMemberExpression(node); node = node.object) {
    nodes.push(node.property);
  }
  nodes.push(node);

  if (nodes.length < parts.length) return false;
  if (!allowPartial && nodes.length > parts.length) return false;

  for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
    const node = nodes[j];
    let value;
    if (isIdentifier(node)) {
      value = node.name;
    } else if (isStringLiteral(node)) {
      value = node.value;
    } else {
      return false;
    }

    if (parts[i] !== value) return false;
  }

  return true;
}

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
export function buildMatchMemberExpression(
  match: string,
  allowPartial?: boolean,
): Object => boolean {
  const parts = match.split(".");
  return function(member) {
    return matchesPattern(member, parts, allowPartial);
  };
}
