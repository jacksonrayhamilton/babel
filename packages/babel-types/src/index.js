// @flow
import is from "./validators/is";
import isType from "./validators/isType";
import isValidIdentifier from "./validators/isValidIdentifier";
import shallowEqual from "./utils/shallowEqual";
import {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
} from "./definitions";

export {
  STATEMENT_OR_BLOCK_KEYS,
  FLATTENABLE_KEYS,
  FOR_INIT_KEYS,
  COMMENT_KEYS,
  LOGICAL_OPERATORS,
  UPDATE_OPERATORS,
  BOOLEAN_NUMBER_BINARY_OPERATORS,
  EQUALITY_BINARY_OPERATORS,
  COMPARISON_BINARY_OPERATORS,
  BOOLEAN_BINARY_OPERATORS,
  NUMBER_BINARY_OPERATORS,
  BINARY_OPERATORS,
  BOOLEAN_UNARY_OPERATORS,
  NUMBER_UNARY_OPERATORS,
  STRING_UNARY_OPERATORS,
  UNARY_OPERATORS,
  INHERIT_KEYS,
  BLOCK_SCOPED_SYMBOL,
  NOT_LOCAL_BINDING,
} from "./constants";

export const TYPES = Object.keys(VISITOR_KEYS)
  .concat(Object.keys(FLIPPED_ALIAS_KEYS))
  .concat(Object.keys(DEPRECATED_KEYS));

import * as _react from "./react";
export { _react as react };
export { traverse, traverseFast } from "./traverse";
export { clone, cloneDeep, cloneWithoutLoc } from "./clone";
export * from "./generated/helpers";

export {
  getBindingIdentifiers,
  getOuterBindingIdentifiers,
} from "./retrievers";

export {
  validate,
  isBinding,
  isReferenced,
  isValidES3Identifier,
  isLet,
  isNode,
  assertNode,
  isBlockScoped,
  isVar,
  isSpecifierDefault,
  isScope,
  isImmutable,
  isNodesEquivalent,
  matchesPattern,
  buildMatchMemberExpression,
} from "./validators";

export {
  toComputedKey,
  toSequenceExpression,
  toKeyAlias,
  toIdentifier,
  toBindingIdentifierName,
  toStatement,
  toExpression,
  toBlock,
  ensureBlock,
  valueToNode,
} from "./converters";

export {
  addComment,
  addComments,
  removeComments,
  inheritsComments,
  inheritLeadingComments,
  inheritTrailingComments,
  inheritInnerComments,
} from "./comments";

export {
  createUnionTypeAnnotation,
  removeTypeDuplicates,
  createTypeAnnotationBasedOnTypeof,
} from "./flow";

export {
  appendToMemberExpression,
  prependToMemberExpression,
  inherits,
  removeProperties,
  removePropertiesDeep,
} from "./modifications";

export {
  is,
  isType,
  isValidIdentifier,
  shallowEqual,
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
};
