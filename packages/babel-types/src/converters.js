import isPlainObject from "lodash/isPlainObject";
import isRegExp from "lodash/isRegExp";
import type { Scope } from "@babel/traverse";
import * as helpers from "./generated/helpers";
import { isValidIdentifier } from "./validators";

export function toComputedKey(
  node: Object,
  key: Object = node.key || node.property,
): Object {
  if (!node.computed) {
    if (helpers.isIdentifier(key)) key = helpers.stringLiteral(key.name);
  }
  return key;
}

function gatherSequenceExpressions(
  nodes: Array<Object>,
  scope: Scope,
  declars: Array<Object>,
): ?Object {
  const exprs = [];
  let ensureLastUndefined = true;

  for (const node of nodes) {
    ensureLastUndefined = false;

    if (helpers.isExpression(node)) {
      exprs.push(node);
    } else if (helpers.isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (helpers.isVariableDeclaration(node)) {
      if (node.kind !== "var") return; // bailed

      for (const declar of (node.declarations: Array)) {
        const bindings = t.getBindingIdentifiers(declar);
        for (const key in bindings) {
          declars.push({
            kind: node.kind,
            id: bindings[key],
          });
        }

        if (declar.init) {
          exprs.push(helpers.assignmentExpression("=", declar.id, declar.init));
        }
      }

      ensureLastUndefined = true;
    } else if (helpers.isIfStatement(node)) {
      const consequent = node.consequent
        ? gatherSequenceExpressions([node.consequent], scope, declars)
        : scope.buildUndefinedNode();
      const alternate = node.alternate
        ? gatherSequenceExpressions([node.alternate], scope, declars)
        : scope.buildUndefinedNode();
      if (!consequent || !alternate) return; // bailed

      exprs.push(helpers.conditionalExpression(node.test, consequent, alternate));
    } else if (helpers.isBlockStatement(node)) {
      const body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body) return; // bailed

      exprs.push(body);
    } else if (helpers.isEmptyStatement(node)) {
      // empty statement so ensure the last item is undefined if we're last
      ensureLastUndefined = true;
    } else {
      // bailed, we can't turn this statement into an expression
      return;
    }
  }

  if (ensureLastUndefined) {
    exprs.push(scope.buildUndefinedNode());
  }

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return helpers.sequenceExpression(exprs);
  }
}

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */

export function toSequenceExpression(
  nodes: Array<Object>,
  scope: Scope,
): ?Object {
  if (!nodes || !nodes.length) return;

  const declars = [];
  const result = gatherSequenceExpressions(nodes, scope, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  return result;
}

export function toKeyAlias(node: Object, key: Object = node.key): string {
  let alias;

  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if (helpers.isIdentifier(key)) {
    alias = key.name;
  } else if (helpers.isStringLiteral(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify(t.removePropertiesDeep(t.cloneDeep(key)));
  }

  if (node.computed) {
    alias = `[${alias}]`;
  }

  if (node.static) {
    alias = `static:${alias}`;
  }

  return alias;
}

toKeyAlias.uid = 0;

toKeyAlias.increment = function() {
  if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
    return (toKeyAlias.uid = 0);
  } else {
    return toKeyAlias.uid++;
  }
};

export function toIdentifier(name: string): string {
  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!isValidIdentifier(name)) {
    name = `_${name}`;
  }

  return name || "_";
}

export function toBindingIdentifierName(name: string): string {
  name = toIdentifier(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}

/**
 * [Please add a description.]
 * @returns {Object|Boolean}
 */

export function toStatement(node: Object, ignore?: boolean) {
  if (helpers.isStatement(node)) {
    return node;
  }

  let mustHaveId = false;
  let newType;

  if (helpers.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (helpers.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (helpers.isAssignmentExpression(node)) {
    return helpers.expressionStatement(node);
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
  }

  node.type = newType;

  return node;
}

export function toExpression(node: Object): Object {
  if (helpers.isExpressionStatement(node)) {
    node = node.expression;
  }

  // return unmodified node
  // important for things like ArrowFunctions where
  // type change from ArrowFunction to FunctionExpression
  // produces bugs like -> `()=>a` to `function () a`
  // without generating a BlockStatement for it
  // ref: https://github.com/babel/babili/issues/130
  if (helpers.isExpression(node)) {
    return node;
  }

  // convert all classes and functions
  // ClassDeclaration -> ClassExpression
  // FunctionDeclaration, ObjectMethod, ClassMethod -> FunctionExpression
  if (helpers.isClass(node)) {
    node.type = "ClassExpression";
  } else if (helpers.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  // if it's still not an expression
  if (!helpers.isExpression(node)) {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }

  return node;
}

export function toBlock(node: Object, parent: Object): Object {
  if (helpers.isBlockStatement(node)) {
    return node;
  }

  if (helpers.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!helpers.isStatement(node)) {
      if (helpers.isFunction(parent)) {
        node = helpers.returnStatement(node);
      } else {
        node = helpers.expressionStatement(node);
      }
    }

    node = [node];
  }

  return helpers.blockStatement(node);
}

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 */
export function ensureBlock(node: Object, key: string = "body"): Object {
  return (node[key] = toBlock(node[key], node));
}

export function valueToNode(value: any): Object {
  // undefined
  if (value === undefined) {
    return helpers.identifier("undefined");
  }

  // boolean
  if (value === true || value === false) {
    return helpers.booleanLiteral(value);
  }

  // null
  if (value === null) {
    return helpers.nullLiteral();
  }

  // strings
  if (typeof value === "string") {
    return helpers.stringLiteral(value);
  }

  // numbers
  if (typeof value === "number") {
    return helpers.numericLiteral(value);
  }

  // regexes
  if (isRegExp(value)) {
    const pattern = value.source;
    const flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return helpers.regExpLiteral(pattern, flags);
  }

  // array
  if (Array.isArray(value)) {
    return helpers.arrayExpression(value.map(helpers.valueToNode));
  }

  // object
  if (isPlainObject(value)) {
    const props = [];
    for (const key in value) {
      let nodeKey;
      if (helpers.isValidIdentifier(key)) {
        nodeKey = helpers.identifier(key);
      } else {
        nodeKey = helpers.stringLiteral(key);
      }
      props.push(helpers.objectProperty(nodeKey, valueToNode(value[key])));
    }
    return helpers.objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}
