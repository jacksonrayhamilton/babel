const fs = require("fs");
const path = require("path");
const definitions = require("../lib/definitions");

let output = `// @flow
import loClone from "lodash/clone";
import { FLIPPED_ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS } from "../definitions";
import { validate } from "../validators";
import is from "../validators/is";

function assert(type: string, node: Object, opts?: Object): void {
  if (!is(type, node, opts)) {
    throw new Error(
      \`Expected type "\${type}" with option \${JSON.stringify(opts)}\`,
    );
  }
}

function builder(type: string, ...args: Array<any>): Object {
  const keys = BUILDER_KEYS[type];
  if (args.length > keys.length) {
    throw new Error(
      \`t.\${type}: Too many arguments passed. Received \${args.length} but can receive \` +
      \`no more than \${keys.length}\`,
    );
  }

  const node = {};
  node.type = type;

  let i = 0;

  for (const key of (keys: Array<string>)) {
    const field = NODE_FIELDS[type][key];

    let arg = args[i++];
    if (arg === undefined) arg = loClone(field.default);

    node[key] = arg;
  }

  for (const key in node) {
    validate(node, key, node[key]);
  }

  return node;
}\n\n`;

function addIsHelper(type) {
  output += `export function is${type}(node: Object, opts?: Object): boolean { return is("${type}", node, opts) }\n`;
}

function addAssertHelper(type) {
  output += `export function assert${type}(node: Object, opts?: Object = {}): void { assert("${type}", node, opts) }\n`;
}

output += "/* Register `is[Type]` and `assert[Type]` for all types. */\n";
Object.keys(definitions.VISITOR_KEYS).forEach(type => {
  addIsHelper(type);
  addAssertHelper(type);
});

/*
Object.keys(FLIPPED_ALIAS_KEYS).forEach(function(type) {
  t[type.toUpperCase() + "_TYPES"] = FLIPPED_ALIAS_KEYS[type];
  registerType(type);
});
*/

output += "/* Register `is[Alias]` and `assert[Alias]` functions for all aliases. */\n";
Object.keys(definitions.FLIPPED_ALIAS_KEYS).forEach(type => {
  output += `export const ${type.toUpperCase()}_TYPES = FLIPPED_ALIAS_KEYS["${type}"];\n`;
  addIsHelper(type);
  addAssertHelper(type);
});

/*for (const type in t.DEPRECATED_KEYS) {
  t[type] = t[type[0].toLowerCase() + type.slice(1)] = proxy(t[newType]);
}*/

Object.keys(definitions.BUILDER_KEYS).forEach(type => {
  output += `export function ${type}(...args: Array<any>): Object { return builder("${type}", ...args); }\n`;

  if (type === "Import" || type === "Super") {
    return;
  }

  output += `export const ${type[0].toLowerCase()}${type.slice(1)} = ${type};\n`;
});

Object.keys(definitions.DEPRECATED_KEYS).forEach(type => {
  const newType = definitions.DEPRECATED_KEYS[type];
  output += `export function is${type}(node: Object, opts: Object): boolean {
    console.trace("The node type ${type} has been renamed to ${newType}");
    return is("${type}", node, opts);
  }\n`;
  output += `export function assert${type}(node: Object, opts: Object): void {
    console.trace("The node type ${type} has been renamed to ${newType}");
    assert("${type}", node, opts);
  }\n`;
  output += `export function ${type}(...args: Array<any>): Object {
    console.trace("The node type ${type} has been renamed to ${newType}");
    return ${type}("${type}", ...args);
  }\n`;
  output += `export const ${type[0].toLowerCase()}${type.slice(1)} = ${type};\n`;
});

fs.writeFileSync(path.join(__dirname, "../src/generated/helpers.js"), output);
