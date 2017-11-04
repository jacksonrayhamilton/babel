// @flow
import loClone from "lodash/clone";
import { FLIPPED_ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS } from "../definitions";
import { validate } from "../validators";
import is from "../validators/is";

function assert(type: string, node: Object, opts?: Object): void {
  if (!is(type, node, opts)) {
    throw new Error(
      `Expected type "${type}" with option ${JSON.stringify(opts)}`,
    );
  }
}

function builder(type: string, ...args: Array<any>): Object {
  const keys = BUILDER_KEYS[type];
  if (args.length > keys.length) {
    throw new Error(
      `t.${type}: Too many arguments passed. Received ${args.length} but can receive ` +
      `no more than ${keys.length}`,
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
}

/* Register `is[Type]` and `assert[Type]` for all types. */
export function isArrayExpression(node: Object, opts?: Object): boolean { return is("ArrayExpression", node, opts) }
export function assertArrayExpression(node: Object, opts?: Object = {}): void { assert("ArrayExpression", node, opts) }
export function isAssignmentExpression(node: Object, opts?: Object): boolean { return is("AssignmentExpression", node, opts) }
export function assertAssignmentExpression(node: Object, opts?: Object = {}): void { assert("AssignmentExpression", node, opts) }
export function isBinaryExpression(node: Object, opts?: Object): boolean { return is("BinaryExpression", node, opts) }
export function assertBinaryExpression(node: Object, opts?: Object = {}): void { assert("BinaryExpression", node, opts) }
export function isDirective(node: Object, opts?: Object): boolean { return is("Directive", node, opts) }
export function assertDirective(node: Object, opts?: Object = {}): void { assert("Directive", node, opts) }
export function isDirectiveLiteral(node: Object, opts?: Object): boolean { return is("DirectiveLiteral", node, opts) }
export function assertDirectiveLiteral(node: Object, opts?: Object = {}): void { assert("DirectiveLiteral", node, opts) }
export function isBlockStatement(node: Object, opts?: Object): boolean { return is("BlockStatement", node, opts) }
export function assertBlockStatement(node: Object, opts?: Object = {}): void { assert("BlockStatement", node, opts) }
export function isBreakStatement(node: Object, opts?: Object): boolean { return is("BreakStatement", node, opts) }
export function assertBreakStatement(node: Object, opts?: Object = {}): void { assert("BreakStatement", node, opts) }
export function isCallExpression(node: Object, opts?: Object): boolean { return is("CallExpression", node, opts) }
export function assertCallExpression(node: Object, opts?: Object = {}): void { assert("CallExpression", node, opts) }
export function isCatchClause(node: Object, opts?: Object): boolean { return is("CatchClause", node, opts) }
export function assertCatchClause(node: Object, opts?: Object = {}): void { assert("CatchClause", node, opts) }
export function isConditionalExpression(node: Object, opts?: Object): boolean { return is("ConditionalExpression", node, opts) }
export function assertConditionalExpression(node: Object, opts?: Object = {}): void { assert("ConditionalExpression", node, opts) }
export function isContinueStatement(node: Object, opts?: Object): boolean { return is("ContinueStatement", node, opts) }
export function assertContinueStatement(node: Object, opts?: Object = {}): void { assert("ContinueStatement", node, opts) }
export function isDebuggerStatement(node: Object, opts?: Object): boolean { return is("DebuggerStatement", node, opts) }
export function assertDebuggerStatement(node: Object, opts?: Object = {}): void { assert("DebuggerStatement", node, opts) }
export function isDoWhileStatement(node: Object, opts?: Object): boolean { return is("DoWhileStatement", node, opts) }
export function assertDoWhileStatement(node: Object, opts?: Object = {}): void { assert("DoWhileStatement", node, opts) }
export function isEmptyStatement(node: Object, opts?: Object): boolean { return is("EmptyStatement", node, opts) }
export function assertEmptyStatement(node: Object, opts?: Object = {}): void { assert("EmptyStatement", node, opts) }
export function isExpressionStatement(node: Object, opts?: Object): boolean { return is("ExpressionStatement", node, opts) }
export function assertExpressionStatement(node: Object, opts?: Object = {}): void { assert("ExpressionStatement", node, opts) }
export function isFile(node: Object, opts?: Object): boolean { return is("File", node, opts) }
export function assertFile(node: Object, opts?: Object = {}): void { assert("File", node, opts) }
export function isForInStatement(node: Object, opts?: Object): boolean { return is("ForInStatement", node, opts) }
export function assertForInStatement(node: Object, opts?: Object = {}): void { assert("ForInStatement", node, opts) }
export function isForStatement(node: Object, opts?: Object): boolean { return is("ForStatement", node, opts) }
export function assertForStatement(node: Object, opts?: Object = {}): void { assert("ForStatement", node, opts) }
export function isFunctionDeclaration(node: Object, opts?: Object): boolean { return is("FunctionDeclaration", node, opts) }
export function assertFunctionDeclaration(node: Object, opts?: Object = {}): void { assert("FunctionDeclaration", node, opts) }
export function isFunctionExpression(node: Object, opts?: Object): boolean { return is("FunctionExpression", node, opts) }
export function assertFunctionExpression(node: Object, opts?: Object = {}): void { assert("FunctionExpression", node, opts) }
export function isIdentifier(node: Object, opts?: Object): boolean { return is("Identifier", node, opts) }
export function assertIdentifier(node: Object, opts?: Object = {}): void { assert("Identifier", node, opts) }
export function isIfStatement(node: Object, opts?: Object): boolean { return is("IfStatement", node, opts) }
export function assertIfStatement(node: Object, opts?: Object = {}): void { assert("IfStatement", node, opts) }
export function isLabeledStatement(node: Object, opts?: Object): boolean { return is("LabeledStatement", node, opts) }
export function assertLabeledStatement(node: Object, opts?: Object = {}): void { assert("LabeledStatement", node, opts) }
export function isStringLiteral(node: Object, opts?: Object): boolean { return is("StringLiteral", node, opts) }
export function assertStringLiteral(node: Object, opts?: Object = {}): void { assert("StringLiteral", node, opts) }
export function isNumericLiteral(node: Object, opts?: Object): boolean { return is("NumericLiteral", node, opts) }
export function assertNumericLiteral(node: Object, opts?: Object = {}): void { assert("NumericLiteral", node, opts) }
export function isNullLiteral(node: Object, opts?: Object): boolean { return is("NullLiteral", node, opts) }
export function assertNullLiteral(node: Object, opts?: Object = {}): void { assert("NullLiteral", node, opts) }
export function isBooleanLiteral(node: Object, opts?: Object): boolean { return is("BooleanLiteral", node, opts) }
export function assertBooleanLiteral(node: Object, opts?: Object = {}): void { assert("BooleanLiteral", node, opts) }
export function isRegExpLiteral(node: Object, opts?: Object): boolean { return is("RegExpLiteral", node, opts) }
export function assertRegExpLiteral(node: Object, opts?: Object = {}): void { assert("RegExpLiteral", node, opts) }
export function isLogicalExpression(node: Object, opts?: Object): boolean { return is("LogicalExpression", node, opts) }
export function assertLogicalExpression(node: Object, opts?: Object = {}): void { assert("LogicalExpression", node, opts) }
export function isMemberExpression(node: Object, opts?: Object): boolean { return is("MemberExpression", node, opts) }
export function assertMemberExpression(node: Object, opts?: Object = {}): void { assert("MemberExpression", node, opts) }
export function isNewExpression(node: Object, opts?: Object): boolean { return is("NewExpression", node, opts) }
export function assertNewExpression(node: Object, opts?: Object = {}): void { assert("NewExpression", node, opts) }
export function isProgram(node: Object, opts?: Object): boolean { return is("Program", node, opts) }
export function assertProgram(node: Object, opts?: Object = {}): void { assert("Program", node, opts) }
export function isObjectExpression(node: Object, opts?: Object): boolean { return is("ObjectExpression", node, opts) }
export function assertObjectExpression(node: Object, opts?: Object = {}): void { assert("ObjectExpression", node, opts) }
export function isObjectMethod(node: Object, opts?: Object): boolean { return is("ObjectMethod", node, opts) }
export function assertObjectMethod(node: Object, opts?: Object = {}): void { assert("ObjectMethod", node, opts) }
export function isObjectProperty(node: Object, opts?: Object): boolean { return is("ObjectProperty", node, opts) }
export function assertObjectProperty(node: Object, opts?: Object = {}): void { assert("ObjectProperty", node, opts) }
export function isRestElement(node: Object, opts?: Object): boolean { return is("RestElement", node, opts) }
export function assertRestElement(node: Object, opts?: Object = {}): void { assert("RestElement", node, opts) }
export function isReturnStatement(node: Object, opts?: Object): boolean { return is("ReturnStatement", node, opts) }
export function assertReturnStatement(node: Object, opts?: Object = {}): void { assert("ReturnStatement", node, opts) }
export function isSequenceExpression(node: Object, opts?: Object): boolean { return is("SequenceExpression", node, opts) }
export function assertSequenceExpression(node: Object, opts?: Object = {}): void { assert("SequenceExpression", node, opts) }
export function isSwitchCase(node: Object, opts?: Object): boolean { return is("SwitchCase", node, opts) }
export function assertSwitchCase(node: Object, opts?: Object = {}): void { assert("SwitchCase", node, opts) }
export function isSwitchStatement(node: Object, opts?: Object): boolean { return is("SwitchStatement", node, opts) }
export function assertSwitchStatement(node: Object, opts?: Object = {}): void { assert("SwitchStatement", node, opts) }
export function isThisExpression(node: Object, opts?: Object): boolean { return is("ThisExpression", node, opts) }
export function assertThisExpression(node: Object, opts?: Object = {}): void { assert("ThisExpression", node, opts) }
export function isThrowStatement(node: Object, opts?: Object): boolean { return is("ThrowStatement", node, opts) }
export function assertThrowStatement(node: Object, opts?: Object = {}): void { assert("ThrowStatement", node, opts) }
export function isTryStatement(node: Object, opts?: Object): boolean { return is("TryStatement", node, opts) }
export function assertTryStatement(node: Object, opts?: Object = {}): void { assert("TryStatement", node, opts) }
export function isUnaryExpression(node: Object, opts?: Object): boolean { return is("UnaryExpression", node, opts) }
export function assertUnaryExpression(node: Object, opts?: Object = {}): void { assert("UnaryExpression", node, opts) }
export function isUpdateExpression(node: Object, opts?: Object): boolean { return is("UpdateExpression", node, opts) }
export function assertUpdateExpression(node: Object, opts?: Object = {}): void { assert("UpdateExpression", node, opts) }
export function isVariableDeclaration(node: Object, opts?: Object): boolean { return is("VariableDeclaration", node, opts) }
export function assertVariableDeclaration(node: Object, opts?: Object = {}): void { assert("VariableDeclaration", node, opts) }
export function isVariableDeclarator(node: Object, opts?: Object): boolean { return is("VariableDeclarator", node, opts) }
export function assertVariableDeclarator(node: Object, opts?: Object = {}): void { assert("VariableDeclarator", node, opts) }
export function isWhileStatement(node: Object, opts?: Object): boolean { return is("WhileStatement", node, opts) }
export function assertWhileStatement(node: Object, opts?: Object = {}): void { assert("WhileStatement", node, opts) }
export function isWithStatement(node: Object, opts?: Object): boolean { return is("WithStatement", node, opts) }
export function assertWithStatement(node: Object, opts?: Object = {}): void { assert("WithStatement", node, opts) }
export function isAssignmentPattern(node: Object, opts?: Object): boolean { return is("AssignmentPattern", node, opts) }
export function assertAssignmentPattern(node: Object, opts?: Object = {}): void { assert("AssignmentPattern", node, opts) }
export function isArrayPattern(node: Object, opts?: Object): boolean { return is("ArrayPattern", node, opts) }
export function assertArrayPattern(node: Object, opts?: Object = {}): void { assert("ArrayPattern", node, opts) }
export function isArrowFunctionExpression(node: Object, opts?: Object): boolean { return is("ArrowFunctionExpression", node, opts) }
export function assertArrowFunctionExpression(node: Object, opts?: Object = {}): void { assert("ArrowFunctionExpression", node, opts) }
export function isClassBody(node: Object, opts?: Object): boolean { return is("ClassBody", node, opts) }
export function assertClassBody(node: Object, opts?: Object = {}): void { assert("ClassBody", node, opts) }
export function isClassDeclaration(node: Object, opts?: Object): boolean { return is("ClassDeclaration", node, opts) }
export function assertClassDeclaration(node: Object, opts?: Object = {}): void { assert("ClassDeclaration", node, opts) }
export function isClassExpression(node: Object, opts?: Object): boolean { return is("ClassExpression", node, opts) }
export function assertClassExpression(node: Object, opts?: Object = {}): void { assert("ClassExpression", node, opts) }
export function isExportAllDeclaration(node: Object, opts?: Object): boolean { return is("ExportAllDeclaration", node, opts) }
export function assertExportAllDeclaration(node: Object, opts?: Object = {}): void { assert("ExportAllDeclaration", node, opts) }
export function isExportDefaultDeclaration(node: Object, opts?: Object): boolean { return is("ExportDefaultDeclaration", node, opts) }
export function assertExportDefaultDeclaration(node: Object, opts?: Object = {}): void { assert("ExportDefaultDeclaration", node, opts) }
export function isExportNamedDeclaration(node: Object, opts?: Object): boolean { return is("ExportNamedDeclaration", node, opts) }
export function assertExportNamedDeclaration(node: Object, opts?: Object = {}): void { assert("ExportNamedDeclaration", node, opts) }
export function isExportSpecifier(node: Object, opts?: Object): boolean { return is("ExportSpecifier", node, opts) }
export function assertExportSpecifier(node: Object, opts?: Object = {}): void { assert("ExportSpecifier", node, opts) }
export function isForOfStatement(node: Object, opts?: Object): boolean { return is("ForOfStatement", node, opts) }
export function assertForOfStatement(node: Object, opts?: Object = {}): void { assert("ForOfStatement", node, opts) }
export function isImportDeclaration(node: Object, opts?: Object): boolean { return is("ImportDeclaration", node, opts) }
export function assertImportDeclaration(node: Object, opts?: Object = {}): void { assert("ImportDeclaration", node, opts) }
export function isImportDefaultSpecifier(node: Object, opts?: Object): boolean { return is("ImportDefaultSpecifier", node, opts) }
export function assertImportDefaultSpecifier(node: Object, opts?: Object = {}): void { assert("ImportDefaultSpecifier", node, opts) }
export function isImportNamespaceSpecifier(node: Object, opts?: Object): boolean { return is("ImportNamespaceSpecifier", node, opts) }
export function assertImportNamespaceSpecifier(node: Object, opts?: Object = {}): void { assert("ImportNamespaceSpecifier", node, opts) }
export function isImportSpecifier(node: Object, opts?: Object): boolean { return is("ImportSpecifier", node, opts) }
export function assertImportSpecifier(node: Object, opts?: Object = {}): void { assert("ImportSpecifier", node, opts) }
export function isMetaProperty(node: Object, opts?: Object): boolean { return is("MetaProperty", node, opts) }
export function assertMetaProperty(node: Object, opts?: Object = {}): void { assert("MetaProperty", node, opts) }
export function isClassMethod(node: Object, opts?: Object): boolean { return is("ClassMethod", node, opts) }
export function assertClassMethod(node: Object, opts?: Object = {}): void { assert("ClassMethod", node, opts) }
export function isObjectPattern(node: Object, opts?: Object): boolean { return is("ObjectPattern", node, opts) }
export function assertObjectPattern(node: Object, opts?: Object = {}): void { assert("ObjectPattern", node, opts) }
export function isSpreadElement(node: Object, opts?: Object): boolean { return is("SpreadElement", node, opts) }
export function assertSpreadElement(node: Object, opts?: Object = {}): void { assert("SpreadElement", node, opts) }
export function isSuper(node: Object, opts?: Object): boolean { return is("Super", node, opts) }
export function assertSuper(node: Object, opts?: Object = {}): void { assert("Super", node, opts) }
export function isTaggedTemplateExpression(node: Object, opts?: Object): boolean { return is("TaggedTemplateExpression", node, opts) }
export function assertTaggedTemplateExpression(node: Object, opts?: Object = {}): void { assert("TaggedTemplateExpression", node, opts) }
export function isTemplateElement(node: Object, opts?: Object): boolean { return is("TemplateElement", node, opts) }
export function assertTemplateElement(node: Object, opts?: Object = {}): void { assert("TemplateElement", node, opts) }
export function isTemplateLiteral(node: Object, opts?: Object): boolean { return is("TemplateLiteral", node, opts) }
export function assertTemplateLiteral(node: Object, opts?: Object = {}): void { assert("TemplateLiteral", node, opts) }
export function isYieldExpression(node: Object, opts?: Object): boolean { return is("YieldExpression", node, opts) }
export function assertYieldExpression(node: Object, opts?: Object = {}): void { assert("YieldExpression", node, opts) }
export function isAnyTypeAnnotation(node: Object, opts?: Object): boolean { return is("AnyTypeAnnotation", node, opts) }
export function assertAnyTypeAnnotation(node: Object, opts?: Object = {}): void { assert("AnyTypeAnnotation", node, opts) }
export function isArrayTypeAnnotation(node: Object, opts?: Object): boolean { return is("ArrayTypeAnnotation", node, opts) }
export function assertArrayTypeAnnotation(node: Object, opts?: Object = {}): void { assert("ArrayTypeAnnotation", node, opts) }
export function isBooleanTypeAnnotation(node: Object, opts?: Object): boolean { return is("BooleanTypeAnnotation", node, opts) }
export function assertBooleanTypeAnnotation(node: Object, opts?: Object = {}): void { assert("BooleanTypeAnnotation", node, opts) }
export function isBooleanLiteralTypeAnnotation(node: Object, opts?: Object): boolean { return is("BooleanLiteralTypeAnnotation", node, opts) }
export function assertBooleanLiteralTypeAnnotation(node: Object, opts?: Object = {}): void { assert("BooleanLiteralTypeAnnotation", node, opts) }
export function isNullLiteralTypeAnnotation(node: Object, opts?: Object): boolean { return is("NullLiteralTypeAnnotation", node, opts) }
export function assertNullLiteralTypeAnnotation(node: Object, opts?: Object = {}): void { assert("NullLiteralTypeAnnotation", node, opts) }
export function isClassImplements(node: Object, opts?: Object): boolean { return is("ClassImplements", node, opts) }
export function assertClassImplements(node: Object, opts?: Object = {}): void { assert("ClassImplements", node, opts) }
export function isDeclareClass(node: Object, opts?: Object): boolean { return is("DeclareClass", node, opts) }
export function assertDeclareClass(node: Object, opts?: Object = {}): void { assert("DeclareClass", node, opts) }
export function isDeclareFunction(node: Object, opts?: Object): boolean { return is("DeclareFunction", node, opts) }
export function assertDeclareFunction(node: Object, opts?: Object = {}): void { assert("DeclareFunction", node, opts) }
export function isDeclareInterface(node: Object, opts?: Object): boolean { return is("DeclareInterface", node, opts) }
export function assertDeclareInterface(node: Object, opts?: Object = {}): void { assert("DeclareInterface", node, opts) }
export function isDeclareModule(node: Object, opts?: Object): boolean { return is("DeclareModule", node, opts) }
export function assertDeclareModule(node: Object, opts?: Object = {}): void { assert("DeclareModule", node, opts) }
export function isDeclareModuleExports(node: Object, opts?: Object): boolean { return is("DeclareModuleExports", node, opts) }
export function assertDeclareModuleExports(node: Object, opts?: Object = {}): void { assert("DeclareModuleExports", node, opts) }
export function isDeclareTypeAlias(node: Object, opts?: Object): boolean { return is("DeclareTypeAlias", node, opts) }
export function assertDeclareTypeAlias(node: Object, opts?: Object = {}): void { assert("DeclareTypeAlias", node, opts) }
export function isDeclareOpaqueType(node: Object, opts?: Object): boolean { return is("DeclareOpaqueType", node, opts) }
export function assertDeclareOpaqueType(node: Object, opts?: Object = {}): void { assert("DeclareOpaqueType", node, opts) }
export function isDeclareVariable(node: Object, opts?: Object): boolean { return is("DeclareVariable", node, opts) }
export function assertDeclareVariable(node: Object, opts?: Object = {}): void { assert("DeclareVariable", node, opts) }
export function isDeclareExportDeclaration(node: Object, opts?: Object): boolean { return is("DeclareExportDeclaration", node, opts) }
export function assertDeclareExportDeclaration(node: Object, opts?: Object = {}): void { assert("DeclareExportDeclaration", node, opts) }
export function isDeclareExportAllDeclaration(node: Object, opts?: Object): boolean { return is("DeclareExportAllDeclaration", node, opts) }
export function assertDeclareExportAllDeclaration(node: Object, opts?: Object = {}): void { assert("DeclareExportAllDeclaration", node, opts) }
export function isDeclaredPredicate(node: Object, opts?: Object): boolean { return is("DeclaredPredicate", node, opts) }
export function assertDeclaredPredicate(node: Object, opts?: Object = {}): void { assert("DeclaredPredicate", node, opts) }
export function isExistsTypeAnnotation(node: Object, opts?: Object): boolean { return is("ExistsTypeAnnotation", node, opts) }
export function assertExistsTypeAnnotation(node: Object, opts?: Object = {}): void { assert("ExistsTypeAnnotation", node, opts) }
export function isFunctionTypeAnnotation(node: Object, opts?: Object): boolean { return is("FunctionTypeAnnotation", node, opts) }
export function assertFunctionTypeAnnotation(node: Object, opts?: Object = {}): void { assert("FunctionTypeAnnotation", node, opts) }
export function isFunctionTypeParam(node: Object, opts?: Object): boolean { return is("FunctionTypeParam", node, opts) }
export function assertFunctionTypeParam(node: Object, opts?: Object = {}): void { assert("FunctionTypeParam", node, opts) }
export function isGenericTypeAnnotation(node: Object, opts?: Object): boolean { return is("GenericTypeAnnotation", node, opts) }
export function assertGenericTypeAnnotation(node: Object, opts?: Object = {}): void { assert("GenericTypeAnnotation", node, opts) }
export function isInferredPredicate(node: Object, opts?: Object): boolean { return is("InferredPredicate", node, opts) }
export function assertInferredPredicate(node: Object, opts?: Object = {}): void { assert("InferredPredicate", node, opts) }
export function isInterfaceExtends(node: Object, opts?: Object): boolean { return is("InterfaceExtends", node, opts) }
export function assertInterfaceExtends(node: Object, opts?: Object = {}): void { assert("InterfaceExtends", node, opts) }
export function isInterfaceDeclaration(node: Object, opts?: Object): boolean { return is("InterfaceDeclaration", node, opts) }
export function assertInterfaceDeclaration(node: Object, opts?: Object = {}): void { assert("InterfaceDeclaration", node, opts) }
export function isIntersectionTypeAnnotation(node: Object, opts?: Object): boolean { return is("IntersectionTypeAnnotation", node, opts) }
export function assertIntersectionTypeAnnotation(node: Object, opts?: Object = {}): void { assert("IntersectionTypeAnnotation", node, opts) }
export function isMixedTypeAnnotation(node: Object, opts?: Object): boolean { return is("MixedTypeAnnotation", node, opts) }
export function assertMixedTypeAnnotation(node: Object, opts?: Object = {}): void { assert("MixedTypeAnnotation", node, opts) }
export function isEmptyTypeAnnotation(node: Object, opts?: Object): boolean { return is("EmptyTypeAnnotation", node, opts) }
export function assertEmptyTypeAnnotation(node: Object, opts?: Object = {}): void { assert("EmptyTypeAnnotation", node, opts) }
export function isNullableTypeAnnotation(node: Object, opts?: Object): boolean { return is("NullableTypeAnnotation", node, opts) }
export function assertNullableTypeAnnotation(node: Object, opts?: Object = {}): void { assert("NullableTypeAnnotation", node, opts) }
export function isNumberLiteralTypeAnnotation(node: Object, opts?: Object): boolean { return is("NumberLiteralTypeAnnotation", node, opts) }
export function assertNumberLiteralTypeAnnotation(node: Object, opts?: Object = {}): void { assert("NumberLiteralTypeAnnotation", node, opts) }
export function isNumberTypeAnnotation(node: Object, opts?: Object): boolean { return is("NumberTypeAnnotation", node, opts) }
export function assertNumberTypeAnnotation(node: Object, opts?: Object = {}): void { assert("NumberTypeAnnotation", node, opts) }
export function isObjectTypeAnnotation(node: Object, opts?: Object): boolean { return is("ObjectTypeAnnotation", node, opts) }
export function assertObjectTypeAnnotation(node: Object, opts?: Object = {}): void { assert("ObjectTypeAnnotation", node, opts) }
export function isObjectTypeCallProperty(node: Object, opts?: Object): boolean { return is("ObjectTypeCallProperty", node, opts) }
export function assertObjectTypeCallProperty(node: Object, opts?: Object = {}): void { assert("ObjectTypeCallProperty", node, opts) }
export function isObjectTypeIndexer(node: Object, opts?: Object): boolean { return is("ObjectTypeIndexer", node, opts) }
export function assertObjectTypeIndexer(node: Object, opts?: Object = {}): void { assert("ObjectTypeIndexer", node, opts) }
export function isObjectTypeProperty(node: Object, opts?: Object): boolean { return is("ObjectTypeProperty", node, opts) }
export function assertObjectTypeProperty(node: Object, opts?: Object = {}): void { assert("ObjectTypeProperty", node, opts) }
export function isObjectTypeSpreadProperty(node: Object, opts?: Object): boolean { return is("ObjectTypeSpreadProperty", node, opts) }
export function assertObjectTypeSpreadProperty(node: Object, opts?: Object = {}): void { assert("ObjectTypeSpreadProperty", node, opts) }
export function isOpaqueType(node: Object, opts?: Object): boolean { return is("OpaqueType", node, opts) }
export function assertOpaqueType(node: Object, opts?: Object = {}): void { assert("OpaqueType", node, opts) }
export function isQualifiedTypeIdentifier(node: Object, opts?: Object): boolean { return is("QualifiedTypeIdentifier", node, opts) }
export function assertQualifiedTypeIdentifier(node: Object, opts?: Object = {}): void { assert("QualifiedTypeIdentifier", node, opts) }
export function isStringLiteralTypeAnnotation(node: Object, opts?: Object): boolean { return is("StringLiteralTypeAnnotation", node, opts) }
export function assertStringLiteralTypeAnnotation(node: Object, opts?: Object = {}): void { assert("StringLiteralTypeAnnotation", node, opts) }
export function isStringTypeAnnotation(node: Object, opts?: Object): boolean { return is("StringTypeAnnotation", node, opts) }
export function assertStringTypeAnnotation(node: Object, opts?: Object = {}): void { assert("StringTypeAnnotation", node, opts) }
export function isThisTypeAnnotation(node: Object, opts?: Object): boolean { return is("ThisTypeAnnotation", node, opts) }
export function assertThisTypeAnnotation(node: Object, opts?: Object = {}): void { assert("ThisTypeAnnotation", node, opts) }
export function isTupleTypeAnnotation(node: Object, opts?: Object): boolean { return is("TupleTypeAnnotation", node, opts) }
export function assertTupleTypeAnnotation(node: Object, opts?: Object = {}): void { assert("TupleTypeAnnotation", node, opts) }
export function isTypeofTypeAnnotation(node: Object, opts?: Object): boolean { return is("TypeofTypeAnnotation", node, opts) }
export function assertTypeofTypeAnnotation(node: Object, opts?: Object = {}): void { assert("TypeofTypeAnnotation", node, opts) }
export function isTypeAlias(node: Object, opts?: Object): boolean { return is("TypeAlias", node, opts) }
export function assertTypeAlias(node: Object, opts?: Object = {}): void { assert("TypeAlias", node, opts) }
export function isTypeAnnotation(node: Object, opts?: Object): boolean { return is("TypeAnnotation", node, opts) }
export function assertTypeAnnotation(node: Object, opts?: Object = {}): void { assert("TypeAnnotation", node, opts) }
export function isTypeCastExpression(node: Object, opts?: Object): boolean { return is("TypeCastExpression", node, opts) }
export function assertTypeCastExpression(node: Object, opts?: Object = {}): void { assert("TypeCastExpression", node, opts) }
export function isTypeParameter(node: Object, opts?: Object): boolean { return is("TypeParameter", node, opts) }
export function assertTypeParameter(node: Object, opts?: Object = {}): void { assert("TypeParameter", node, opts) }
export function isTypeParameterDeclaration(node: Object, opts?: Object): boolean { return is("TypeParameterDeclaration", node, opts) }
export function assertTypeParameterDeclaration(node: Object, opts?: Object = {}): void { assert("TypeParameterDeclaration", node, opts) }
export function isTypeParameterInstantiation(node: Object, opts?: Object): boolean { return is("TypeParameterInstantiation", node, opts) }
export function assertTypeParameterInstantiation(node: Object, opts?: Object = {}): void { assert("TypeParameterInstantiation", node, opts) }
export function isUnionTypeAnnotation(node: Object, opts?: Object): boolean { return is("UnionTypeAnnotation", node, opts) }
export function assertUnionTypeAnnotation(node: Object, opts?: Object = {}): void { assert("UnionTypeAnnotation", node, opts) }
export function isVoidTypeAnnotation(node: Object, opts?: Object): boolean { return is("VoidTypeAnnotation", node, opts) }
export function assertVoidTypeAnnotation(node: Object, opts?: Object = {}): void { assert("VoidTypeAnnotation", node, opts) }
export function isJSXAttribute(node: Object, opts?: Object): boolean { return is("JSXAttribute", node, opts) }
export function assertJSXAttribute(node: Object, opts?: Object = {}): void { assert("JSXAttribute", node, opts) }
export function isJSXClosingElement(node: Object, opts?: Object): boolean { return is("JSXClosingElement", node, opts) }
export function assertJSXClosingElement(node: Object, opts?: Object = {}): void { assert("JSXClosingElement", node, opts) }
export function isJSXElement(node: Object, opts?: Object): boolean { return is("JSXElement", node, opts) }
export function assertJSXElement(node: Object, opts?: Object = {}): void { assert("JSXElement", node, opts) }
export function isJSXEmptyExpression(node: Object, opts?: Object): boolean { return is("JSXEmptyExpression", node, opts) }
export function assertJSXEmptyExpression(node: Object, opts?: Object = {}): void { assert("JSXEmptyExpression", node, opts) }
export function isJSXExpressionContainer(node: Object, opts?: Object): boolean { return is("JSXExpressionContainer", node, opts) }
export function assertJSXExpressionContainer(node: Object, opts?: Object = {}): void { assert("JSXExpressionContainer", node, opts) }
export function isJSXSpreadChild(node: Object, opts?: Object): boolean { return is("JSXSpreadChild", node, opts) }
export function assertJSXSpreadChild(node: Object, opts?: Object = {}): void { assert("JSXSpreadChild", node, opts) }
export function isJSXIdentifier(node: Object, opts?: Object): boolean { return is("JSXIdentifier", node, opts) }
export function assertJSXIdentifier(node: Object, opts?: Object = {}): void { assert("JSXIdentifier", node, opts) }
export function isJSXMemberExpression(node: Object, opts?: Object): boolean { return is("JSXMemberExpression", node, opts) }
export function assertJSXMemberExpression(node: Object, opts?: Object = {}): void { assert("JSXMemberExpression", node, opts) }
export function isJSXNamespacedName(node: Object, opts?: Object): boolean { return is("JSXNamespacedName", node, opts) }
export function assertJSXNamespacedName(node: Object, opts?: Object = {}): void { assert("JSXNamespacedName", node, opts) }
export function isJSXOpeningElement(node: Object, opts?: Object): boolean { return is("JSXOpeningElement", node, opts) }
export function assertJSXOpeningElement(node: Object, opts?: Object = {}): void { assert("JSXOpeningElement", node, opts) }
export function isJSXSpreadAttribute(node: Object, opts?: Object): boolean { return is("JSXSpreadAttribute", node, opts) }
export function assertJSXSpreadAttribute(node: Object, opts?: Object = {}): void { assert("JSXSpreadAttribute", node, opts) }
export function isJSXText(node: Object, opts?: Object): boolean { return is("JSXText", node, opts) }
export function assertJSXText(node: Object, opts?: Object = {}): void { assert("JSXText", node, opts) }
export function isJSXFragment(node: Object, opts?: Object): boolean { return is("JSXFragment", node, opts) }
export function assertJSXFragment(node: Object, opts?: Object = {}): void { assert("JSXFragment", node, opts) }
export function isJSXOpeningFragment(node: Object, opts?: Object): boolean { return is("JSXOpeningFragment", node, opts) }
export function assertJSXOpeningFragment(node: Object, opts?: Object = {}): void { assert("JSXOpeningFragment", node, opts) }
export function isJSXClosingFragment(node: Object, opts?: Object): boolean { return is("JSXClosingFragment", node, opts) }
export function assertJSXClosingFragment(node: Object, opts?: Object = {}): void { assert("JSXClosingFragment", node, opts) }
export function isNoop(node: Object, opts?: Object): boolean { return is("Noop", node, opts) }
export function assertNoop(node: Object, opts?: Object = {}): void { assert("Noop", node, opts) }
export function isParenthesizedExpression(node: Object, opts?: Object): boolean { return is("ParenthesizedExpression", node, opts) }
export function assertParenthesizedExpression(node: Object, opts?: Object = {}): void { assert("ParenthesizedExpression", node, opts) }
export function isAwaitExpression(node: Object, opts?: Object): boolean { return is("AwaitExpression", node, opts) }
export function assertAwaitExpression(node: Object, opts?: Object = {}): void { assert("AwaitExpression", node, opts) }
export function isBindExpression(node: Object, opts?: Object): boolean { return is("BindExpression", node, opts) }
export function assertBindExpression(node: Object, opts?: Object = {}): void { assert("BindExpression", node, opts) }
export function isClassProperty(node: Object, opts?: Object): boolean { return is("ClassProperty", node, opts) }
export function assertClassProperty(node: Object, opts?: Object = {}): void { assert("ClassProperty", node, opts) }
export function isImport(node: Object, opts?: Object): boolean { return is("Import", node, opts) }
export function assertImport(node: Object, opts?: Object = {}): void { assert("Import", node, opts) }
export function isDecorator(node: Object, opts?: Object): boolean { return is("Decorator", node, opts) }
export function assertDecorator(node: Object, opts?: Object = {}): void { assert("Decorator", node, opts) }
export function isDoExpression(node: Object, opts?: Object): boolean { return is("DoExpression", node, opts) }
export function assertDoExpression(node: Object, opts?: Object = {}): void { assert("DoExpression", node, opts) }
export function isExportDefaultSpecifier(node: Object, opts?: Object): boolean { return is("ExportDefaultSpecifier", node, opts) }
export function assertExportDefaultSpecifier(node: Object, opts?: Object = {}): void { assert("ExportDefaultSpecifier", node, opts) }
export function isExportNamespaceSpecifier(node: Object, opts?: Object): boolean { return is("ExportNamespaceSpecifier", node, opts) }
export function assertExportNamespaceSpecifier(node: Object, opts?: Object = {}): void { assert("ExportNamespaceSpecifier", node, opts) }
export function isTSParameterProperty(node: Object, opts?: Object): boolean { return is("TSParameterProperty", node, opts) }
export function assertTSParameterProperty(node: Object, opts?: Object = {}): void { assert("TSParameterProperty", node, opts) }
export function isTSDeclareFunction(node: Object, opts?: Object): boolean { return is("TSDeclareFunction", node, opts) }
export function assertTSDeclareFunction(node: Object, opts?: Object = {}): void { assert("TSDeclareFunction", node, opts) }
export function isTSDeclareMethod(node: Object, opts?: Object): boolean { return is("TSDeclareMethod", node, opts) }
export function assertTSDeclareMethod(node: Object, opts?: Object = {}): void { assert("TSDeclareMethod", node, opts) }
export function isTSQualifiedName(node: Object, opts?: Object): boolean { return is("TSQualifiedName", node, opts) }
export function assertTSQualifiedName(node: Object, opts?: Object = {}): void { assert("TSQualifiedName", node, opts) }
export function isTSCallSignatureDeclaration(node: Object, opts?: Object): boolean { return is("TSCallSignatureDeclaration", node, opts) }
export function assertTSCallSignatureDeclaration(node: Object, opts?: Object = {}): void { assert("TSCallSignatureDeclaration", node, opts) }
export function isTSConstructSignatureDeclaration(node: Object, opts?: Object): boolean { return is("TSConstructSignatureDeclaration", node, opts) }
export function assertTSConstructSignatureDeclaration(node: Object, opts?: Object = {}): void { assert("TSConstructSignatureDeclaration", node, opts) }
export function isTSPropertySignature(node: Object, opts?: Object): boolean { return is("TSPropertySignature", node, opts) }
export function assertTSPropertySignature(node: Object, opts?: Object = {}): void { assert("TSPropertySignature", node, opts) }
export function isTSMethodSignature(node: Object, opts?: Object): boolean { return is("TSMethodSignature", node, opts) }
export function assertTSMethodSignature(node: Object, opts?: Object = {}): void { assert("TSMethodSignature", node, opts) }
export function isTSIndexSignature(node: Object, opts?: Object): boolean { return is("TSIndexSignature", node, opts) }
export function assertTSIndexSignature(node: Object, opts?: Object = {}): void { assert("TSIndexSignature", node, opts) }
export function isTSAnyKeyword(node: Object, opts?: Object): boolean { return is("TSAnyKeyword", node, opts) }
export function assertTSAnyKeyword(node: Object, opts?: Object = {}): void { assert("TSAnyKeyword", node, opts) }
export function isTSNumberKeyword(node: Object, opts?: Object): boolean { return is("TSNumberKeyword", node, opts) }
export function assertTSNumberKeyword(node: Object, opts?: Object = {}): void { assert("TSNumberKeyword", node, opts) }
export function isTSObjectKeyword(node: Object, opts?: Object): boolean { return is("TSObjectKeyword", node, opts) }
export function assertTSObjectKeyword(node: Object, opts?: Object = {}): void { assert("TSObjectKeyword", node, opts) }
export function isTSBooleanKeyword(node: Object, opts?: Object): boolean { return is("TSBooleanKeyword", node, opts) }
export function assertTSBooleanKeyword(node: Object, opts?: Object = {}): void { assert("TSBooleanKeyword", node, opts) }
export function isTSStringKeyword(node: Object, opts?: Object): boolean { return is("TSStringKeyword", node, opts) }
export function assertTSStringKeyword(node: Object, opts?: Object = {}): void { assert("TSStringKeyword", node, opts) }
export function isTSSymbolKeyword(node: Object, opts?: Object): boolean { return is("TSSymbolKeyword", node, opts) }
export function assertTSSymbolKeyword(node: Object, opts?: Object = {}): void { assert("TSSymbolKeyword", node, opts) }
export function isTSVoidKeyword(node: Object, opts?: Object): boolean { return is("TSVoidKeyword", node, opts) }
export function assertTSVoidKeyword(node: Object, opts?: Object = {}): void { assert("TSVoidKeyword", node, opts) }
export function isTSUndefinedKeyword(node: Object, opts?: Object): boolean { return is("TSUndefinedKeyword", node, opts) }
export function assertTSUndefinedKeyword(node: Object, opts?: Object = {}): void { assert("TSUndefinedKeyword", node, opts) }
export function isTSNullKeyword(node: Object, opts?: Object): boolean { return is("TSNullKeyword", node, opts) }
export function assertTSNullKeyword(node: Object, opts?: Object = {}): void { assert("TSNullKeyword", node, opts) }
export function isTSNeverKeyword(node: Object, opts?: Object): boolean { return is("TSNeverKeyword", node, opts) }
export function assertTSNeverKeyword(node: Object, opts?: Object = {}): void { assert("TSNeverKeyword", node, opts) }
export function isTSThisType(node: Object, opts?: Object): boolean { return is("TSThisType", node, opts) }
export function assertTSThisType(node: Object, opts?: Object = {}): void { assert("TSThisType", node, opts) }
export function isTSFunctionType(node: Object, opts?: Object): boolean { return is("TSFunctionType", node, opts) }
export function assertTSFunctionType(node: Object, opts?: Object = {}): void { assert("TSFunctionType", node, opts) }
export function isTSConstructorType(node: Object, opts?: Object): boolean { return is("TSConstructorType", node, opts) }
export function assertTSConstructorType(node: Object, opts?: Object = {}): void { assert("TSConstructorType", node, opts) }
export function isTSTypeReference(node: Object, opts?: Object): boolean { return is("TSTypeReference", node, opts) }
export function assertTSTypeReference(node: Object, opts?: Object = {}): void { assert("TSTypeReference", node, opts) }
export function isTSTypePredicate(node: Object, opts?: Object): boolean { return is("TSTypePredicate", node, opts) }
export function assertTSTypePredicate(node: Object, opts?: Object = {}): void { assert("TSTypePredicate", node, opts) }
export function isTSTypeQuery(node: Object, opts?: Object): boolean { return is("TSTypeQuery", node, opts) }
export function assertTSTypeQuery(node: Object, opts?: Object = {}): void { assert("TSTypeQuery", node, opts) }
export function isTSTypeLiteral(node: Object, opts?: Object): boolean { return is("TSTypeLiteral", node, opts) }
export function assertTSTypeLiteral(node: Object, opts?: Object = {}): void { assert("TSTypeLiteral", node, opts) }
export function isTSArrayType(node: Object, opts?: Object): boolean { return is("TSArrayType", node, opts) }
export function assertTSArrayType(node: Object, opts?: Object = {}): void { assert("TSArrayType", node, opts) }
export function isTSTupleType(node: Object, opts?: Object): boolean { return is("TSTupleType", node, opts) }
export function assertTSTupleType(node: Object, opts?: Object = {}): void { assert("TSTupleType", node, opts) }
export function isTSUnionType(node: Object, opts?: Object): boolean { return is("TSUnionType", node, opts) }
export function assertTSUnionType(node: Object, opts?: Object = {}): void { assert("TSUnionType", node, opts) }
export function isTSIntersectionType(node: Object, opts?: Object): boolean { return is("TSIntersectionType", node, opts) }
export function assertTSIntersectionType(node: Object, opts?: Object = {}): void { assert("TSIntersectionType", node, opts) }
export function isTSParenthesizedType(node: Object, opts?: Object): boolean { return is("TSParenthesizedType", node, opts) }
export function assertTSParenthesizedType(node: Object, opts?: Object = {}): void { assert("TSParenthesizedType", node, opts) }
export function isTSTypeOperator(node: Object, opts?: Object): boolean { return is("TSTypeOperator", node, opts) }
export function assertTSTypeOperator(node: Object, opts?: Object = {}): void { assert("TSTypeOperator", node, opts) }
export function isTSIndexedAccessType(node: Object, opts?: Object): boolean { return is("TSIndexedAccessType", node, opts) }
export function assertTSIndexedAccessType(node: Object, opts?: Object = {}): void { assert("TSIndexedAccessType", node, opts) }
export function isTSMappedType(node: Object, opts?: Object): boolean { return is("TSMappedType", node, opts) }
export function assertTSMappedType(node: Object, opts?: Object = {}): void { assert("TSMappedType", node, opts) }
export function isTSLiteralType(node: Object, opts?: Object): boolean { return is("TSLiteralType", node, opts) }
export function assertTSLiteralType(node: Object, opts?: Object = {}): void { assert("TSLiteralType", node, opts) }
export function isTSExpressionWithTypeArguments(node: Object, opts?: Object): boolean { return is("TSExpressionWithTypeArguments", node, opts) }
export function assertTSExpressionWithTypeArguments(node: Object, opts?: Object = {}): void { assert("TSExpressionWithTypeArguments", node, opts) }
export function isTSInterfaceDeclaration(node: Object, opts?: Object): boolean { return is("TSInterfaceDeclaration", node, opts) }
export function assertTSInterfaceDeclaration(node: Object, opts?: Object = {}): void { assert("TSInterfaceDeclaration", node, opts) }
export function isTSInterfaceBody(node: Object, opts?: Object): boolean { return is("TSInterfaceBody", node, opts) }
export function assertTSInterfaceBody(node: Object, opts?: Object = {}): void { assert("TSInterfaceBody", node, opts) }
export function isTSTypeAliasDeclaration(node: Object, opts?: Object): boolean { return is("TSTypeAliasDeclaration", node, opts) }
export function assertTSTypeAliasDeclaration(node: Object, opts?: Object = {}): void { assert("TSTypeAliasDeclaration", node, opts) }
export function isTSAsExpression(node: Object, opts?: Object): boolean { return is("TSAsExpression", node, opts) }
export function assertTSAsExpression(node: Object, opts?: Object = {}): void { assert("TSAsExpression", node, opts) }
export function isTSTypeAssertion(node: Object, opts?: Object): boolean { return is("TSTypeAssertion", node, opts) }
export function assertTSTypeAssertion(node: Object, opts?: Object = {}): void { assert("TSTypeAssertion", node, opts) }
export function isTSEnumDeclaration(node: Object, opts?: Object): boolean { return is("TSEnumDeclaration", node, opts) }
export function assertTSEnumDeclaration(node: Object, opts?: Object = {}): void { assert("TSEnumDeclaration", node, opts) }
export function isTSEnumMember(node: Object, opts?: Object): boolean { return is("TSEnumMember", node, opts) }
export function assertTSEnumMember(node: Object, opts?: Object = {}): void { assert("TSEnumMember", node, opts) }
export function isTSModuleDeclaration(node: Object, opts?: Object): boolean { return is("TSModuleDeclaration", node, opts) }
export function assertTSModuleDeclaration(node: Object, opts?: Object = {}): void { assert("TSModuleDeclaration", node, opts) }
export function isTSModuleBlock(node: Object, opts?: Object): boolean { return is("TSModuleBlock", node, opts) }
export function assertTSModuleBlock(node: Object, opts?: Object = {}): void { assert("TSModuleBlock", node, opts) }
export function isTSImportEqualsDeclaration(node: Object, opts?: Object): boolean { return is("TSImportEqualsDeclaration", node, opts) }
export function assertTSImportEqualsDeclaration(node: Object, opts?: Object = {}): void { assert("TSImportEqualsDeclaration", node, opts) }
export function isTSExternalModuleReference(node: Object, opts?: Object): boolean { return is("TSExternalModuleReference", node, opts) }
export function assertTSExternalModuleReference(node: Object, opts?: Object = {}): void { assert("TSExternalModuleReference", node, opts) }
export function isTSNonNullExpression(node: Object, opts?: Object): boolean { return is("TSNonNullExpression", node, opts) }
export function assertTSNonNullExpression(node: Object, opts?: Object = {}): void { assert("TSNonNullExpression", node, opts) }
export function isTSExportAssignment(node: Object, opts?: Object): boolean { return is("TSExportAssignment", node, opts) }
export function assertTSExportAssignment(node: Object, opts?: Object = {}): void { assert("TSExportAssignment", node, opts) }
export function isTSNamespaceExportDeclaration(node: Object, opts?: Object): boolean { return is("TSNamespaceExportDeclaration", node, opts) }
export function assertTSNamespaceExportDeclaration(node: Object, opts?: Object = {}): void { assert("TSNamespaceExportDeclaration", node, opts) }
export function isTSTypeAnnotation(node: Object, opts?: Object): boolean { return is("TSTypeAnnotation", node, opts) }
export function assertTSTypeAnnotation(node: Object, opts?: Object = {}): void { assert("TSTypeAnnotation", node, opts) }
export function isTSTypeParameterInstantiation(node: Object, opts?: Object): boolean { return is("TSTypeParameterInstantiation", node, opts) }
export function assertTSTypeParameterInstantiation(node: Object, opts?: Object = {}): void { assert("TSTypeParameterInstantiation", node, opts) }
export function isTSTypeParameterDeclaration(node: Object, opts?: Object): boolean { return is("TSTypeParameterDeclaration", node, opts) }
export function assertTSTypeParameterDeclaration(node: Object, opts?: Object = {}): void { assert("TSTypeParameterDeclaration", node, opts) }
export function isTSTypeParameter(node: Object, opts?: Object): boolean { return is("TSTypeParameter", node, opts) }
export function assertTSTypeParameter(node: Object, opts?: Object = {}): void { assert("TSTypeParameter", node, opts) }
/* Register `is[Alias]` and `assert[Alias]` functions for all aliases. */
export const EXPRESSION_TYPES = FLIPPED_ALIAS_KEYS["Expression"];
export function isExpression(node: Object, opts?: Object): boolean { return is("Expression", node, opts) }
export function assertExpression(node: Object, opts?: Object = {}): void { assert("Expression", node, opts) }
export const BINARY_TYPES = FLIPPED_ALIAS_KEYS["Binary"];
export function isBinary(node: Object, opts?: Object): boolean { return is("Binary", node, opts) }
export function assertBinary(node: Object, opts?: Object = {}): void { assert("Binary", node, opts) }
export const SCOPABLE_TYPES = FLIPPED_ALIAS_KEYS["Scopable"];
export function isScopable(node: Object, opts?: Object): boolean { return is("Scopable", node, opts) }
export function assertScopable(node: Object, opts?: Object = {}): void { assert("Scopable", node, opts) }
export const BLOCKPARENT_TYPES = FLIPPED_ALIAS_KEYS["BlockParent"];
export function isBlockParent(node: Object, opts?: Object): boolean { return is("BlockParent", node, opts) }
export function assertBlockParent(node: Object, opts?: Object = {}): void { assert("BlockParent", node, opts) }
export const BLOCK_TYPES = FLIPPED_ALIAS_KEYS["Block"];
export function isBlock(node: Object, opts?: Object): boolean { return is("Block", node, opts) }
export function assertBlock(node: Object, opts?: Object = {}): void { assert("Block", node, opts) }
export const STATEMENT_TYPES = FLIPPED_ALIAS_KEYS["Statement"];
export function isStatement(node: Object, opts?: Object): boolean { return is("Statement", node, opts) }
export function assertStatement(node: Object, opts?: Object = {}): void { assert("Statement", node, opts) }
export const TERMINATORLESS_TYPES = FLIPPED_ALIAS_KEYS["Terminatorless"];
export function isTerminatorless(node: Object, opts?: Object): boolean { return is("Terminatorless", node, opts) }
export function assertTerminatorless(node: Object, opts?: Object = {}): void { assert("Terminatorless", node, opts) }
export const COMPLETIONSTATEMENT_TYPES = FLIPPED_ALIAS_KEYS["CompletionStatement"];
export function isCompletionStatement(node: Object, opts?: Object): boolean { return is("CompletionStatement", node, opts) }
export function assertCompletionStatement(node: Object, opts?: Object = {}): void { assert("CompletionStatement", node, opts) }
export const CONDITIONAL_TYPES = FLIPPED_ALIAS_KEYS["Conditional"];
export function isConditional(node: Object, opts?: Object): boolean { return is("Conditional", node, opts) }
export function assertConditional(node: Object, opts?: Object = {}): void { assert("Conditional", node, opts) }
export const LOOP_TYPES = FLIPPED_ALIAS_KEYS["Loop"];
export function isLoop(node: Object, opts?: Object): boolean { return is("Loop", node, opts) }
export function assertLoop(node: Object, opts?: Object = {}): void { assert("Loop", node, opts) }
export const WHILE_TYPES = FLIPPED_ALIAS_KEYS["While"];
export function isWhile(node: Object, opts?: Object): boolean { return is("While", node, opts) }
export function assertWhile(node: Object, opts?: Object = {}): void { assert("While", node, opts) }
export const EXPRESSIONWRAPPER_TYPES = FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
export function isExpressionWrapper(node: Object, opts?: Object): boolean { return is("ExpressionWrapper", node, opts) }
export function assertExpressionWrapper(node: Object, opts?: Object = {}): void { assert("ExpressionWrapper", node, opts) }
export const FOR_TYPES = FLIPPED_ALIAS_KEYS["For"];
export function isFor(node: Object, opts?: Object): boolean { return is("For", node, opts) }
export function assertFor(node: Object, opts?: Object = {}): void { assert("For", node, opts) }
export const FORXSTATEMENT_TYPES = FLIPPED_ALIAS_KEYS["ForXStatement"];
export function isForXStatement(node: Object, opts?: Object): boolean { return is("ForXStatement", node, opts) }
export function assertForXStatement(node: Object, opts?: Object = {}): void { assert("ForXStatement", node, opts) }
export const FUNCTION_TYPES = FLIPPED_ALIAS_KEYS["Function"];
export function isFunction(node: Object, opts?: Object): boolean { return is("Function", node, opts) }
export function assertFunction(node: Object, opts?: Object = {}): void { assert("Function", node, opts) }
export const FUNCTIONPARENT_TYPES = FLIPPED_ALIAS_KEYS["FunctionParent"];
export function isFunctionParent(node: Object, opts?: Object): boolean { return is("FunctionParent", node, opts) }
export function assertFunctionParent(node: Object, opts?: Object = {}): void { assert("FunctionParent", node, opts) }
export const PUREISH_TYPES = FLIPPED_ALIAS_KEYS["Pureish"];
export function isPureish(node: Object, opts?: Object): boolean { return is("Pureish", node, opts) }
export function assertPureish(node: Object, opts?: Object = {}): void { assert("Pureish", node, opts) }
export const DECLARATION_TYPES = FLIPPED_ALIAS_KEYS["Declaration"];
export function isDeclaration(node: Object, opts?: Object): boolean { return is("Declaration", node, opts) }
export function assertDeclaration(node: Object, opts?: Object = {}): void { assert("Declaration", node, opts) }
export const PATTERNLIKE_TYPES = FLIPPED_ALIAS_KEYS["PatternLike"];
export function isPatternLike(node: Object, opts?: Object): boolean { return is("PatternLike", node, opts) }
export function assertPatternLike(node: Object, opts?: Object = {}): void { assert("PatternLike", node, opts) }
export const LVAL_TYPES = FLIPPED_ALIAS_KEYS["LVal"];
export function isLVal(node: Object, opts?: Object): boolean { return is("LVal", node, opts) }
export function assertLVal(node: Object, opts?: Object = {}): void { assert("LVal", node, opts) }
export const TSENTITYNAME_TYPES = FLIPPED_ALIAS_KEYS["TSEntityName"];
export function isTSEntityName(node: Object, opts?: Object): boolean { return is("TSEntityName", node, opts) }
export function assertTSEntityName(node: Object, opts?: Object = {}): void { assert("TSEntityName", node, opts) }
export const LITERAL_TYPES = FLIPPED_ALIAS_KEYS["Literal"];
export function isLiteral(node: Object, opts?: Object): boolean { return is("Literal", node, opts) }
export function assertLiteral(node: Object, opts?: Object = {}): void { assert("Literal", node, opts) }
export const IMMUTABLE_TYPES = FLIPPED_ALIAS_KEYS["Immutable"];
export function isImmutable(node: Object, opts?: Object): boolean { return is("Immutable", node, opts) }
export function assertImmutable(node: Object, opts?: Object = {}): void { assert("Immutable", node, opts) }
export const USERWHITESPACABLE_TYPES = FLIPPED_ALIAS_KEYS["UserWhitespacable"];
export function isUserWhitespacable(node: Object, opts?: Object): boolean { return is("UserWhitespacable", node, opts) }
export function assertUserWhitespacable(node: Object, opts?: Object = {}): void { assert("UserWhitespacable", node, opts) }
export const METHOD_TYPES = FLIPPED_ALIAS_KEYS["Method"];
export function isMethod(node: Object, opts?: Object): boolean { return is("Method", node, opts) }
export function assertMethod(node: Object, opts?: Object = {}): void { assert("Method", node, opts) }
export const OBJECTMEMBER_TYPES = FLIPPED_ALIAS_KEYS["ObjectMember"];
export function isObjectMember(node: Object, opts?: Object): boolean { return is("ObjectMember", node, opts) }
export function assertObjectMember(node: Object, opts?: Object = {}): void { assert("ObjectMember", node, opts) }
export const PROPERTY_TYPES = FLIPPED_ALIAS_KEYS["Property"];
export function isProperty(node: Object, opts?: Object): boolean { return is("Property", node, opts) }
export function assertProperty(node: Object, opts?: Object = {}): void { assert("Property", node, opts) }
export const UNARYLIKE_TYPES = FLIPPED_ALIAS_KEYS["UnaryLike"];
export function isUnaryLike(node: Object, opts?: Object): boolean { return is("UnaryLike", node, opts) }
export function assertUnaryLike(node: Object, opts?: Object = {}): void { assert("UnaryLike", node, opts) }
export const PATTERN_TYPES = FLIPPED_ALIAS_KEYS["Pattern"];
export function isPattern(node: Object, opts?: Object): boolean { return is("Pattern", node, opts) }
export function assertPattern(node: Object, opts?: Object = {}): void { assert("Pattern", node, opts) }
export const CLASS_TYPES = FLIPPED_ALIAS_KEYS["Class"];
export function isClass(node: Object, opts?: Object): boolean { return is("Class", node, opts) }
export function assertClass(node: Object, opts?: Object = {}): void { assert("Class", node, opts) }
export const MODULEDECLARATION_TYPES = FLIPPED_ALIAS_KEYS["ModuleDeclaration"];
export function isModuleDeclaration(node: Object, opts?: Object): boolean { return is("ModuleDeclaration", node, opts) }
export function assertModuleDeclaration(node: Object, opts?: Object = {}): void { assert("ModuleDeclaration", node, opts) }
export const EXPORTDECLARATION_TYPES = FLIPPED_ALIAS_KEYS["ExportDeclaration"];
export function isExportDeclaration(node: Object, opts?: Object): boolean { return is("ExportDeclaration", node, opts) }
export function assertExportDeclaration(node: Object, opts?: Object = {}): void { assert("ExportDeclaration", node, opts) }
export const MODULESPECIFIER_TYPES = FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
export function isModuleSpecifier(node: Object, opts?: Object): boolean { return is("ModuleSpecifier", node, opts) }
export function assertModuleSpecifier(node: Object, opts?: Object = {}): void { assert("ModuleSpecifier", node, opts) }
export const FLOW_TYPES = FLIPPED_ALIAS_KEYS["Flow"];
export function isFlow(node: Object, opts?: Object): boolean { return is("Flow", node, opts) }
export function assertFlow(node: Object, opts?: Object = {}): void { assert("Flow", node, opts) }
export const FLOWBASEANNOTATION_TYPES = FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
export function isFlowBaseAnnotation(node: Object, opts?: Object): boolean { return is("FlowBaseAnnotation", node, opts) }
export function assertFlowBaseAnnotation(node: Object, opts?: Object = {}): void { assert("FlowBaseAnnotation", node, opts) }
export const FLOWDECLARATION_TYPES = FLIPPED_ALIAS_KEYS["FlowDeclaration"];
export function isFlowDeclaration(node: Object, opts?: Object): boolean { return is("FlowDeclaration", node, opts) }
export function assertFlowDeclaration(node: Object, opts?: Object = {}): void { assert("FlowDeclaration", node, opts) }
export const FLOWPREDICATE_TYPES = FLIPPED_ALIAS_KEYS["FlowPredicate"];
export function isFlowPredicate(node: Object, opts?: Object): boolean { return is("FlowPredicate", node, opts) }
export function assertFlowPredicate(node: Object, opts?: Object = {}): void { assert("FlowPredicate", node, opts) }
export const JSX_TYPES = FLIPPED_ALIAS_KEYS["JSX"];
export function isJSX(node: Object, opts?: Object): boolean { return is("JSX", node, opts) }
export function assertJSX(node: Object, opts?: Object = {}): void { assert("JSX", node, opts) }
export const TSTYPEELEMENT_TYPES = FLIPPED_ALIAS_KEYS["TSTypeElement"];
export function isTSTypeElement(node: Object, opts?: Object): boolean { return is("TSTypeElement", node, opts) }
export function assertTSTypeElement(node: Object, opts?: Object = {}): void { assert("TSTypeElement", node, opts) }
export const TSTYPE_TYPES = FLIPPED_ALIAS_KEYS["TSType"];
export function isTSType(node: Object, opts?: Object): boolean { return is("TSType", node, opts) }
export function assertTSType(node: Object, opts?: Object = {}): void { assert("TSType", node, opts) }
export function ArrayExpression(...args: Array<any>): Object { return builder("ArrayExpression", ...args); }
export const arrayExpression = ArrayExpression;
export function AssignmentExpression(...args: Array<any>): Object { return builder("AssignmentExpression", ...args); }
export const assignmentExpression = AssignmentExpression;
export function BinaryExpression(...args: Array<any>): Object { return builder("BinaryExpression", ...args); }
export const binaryExpression = BinaryExpression;
export function Directive(...args: Array<any>): Object { return builder("Directive", ...args); }
export const directive = Directive;
export function DirectiveLiteral(...args: Array<any>): Object { return builder("DirectiveLiteral", ...args); }
export const directiveLiteral = DirectiveLiteral;
export function BlockStatement(...args: Array<any>): Object { return builder("BlockStatement", ...args); }
export const blockStatement = BlockStatement;
export function BreakStatement(...args: Array<any>): Object { return builder("BreakStatement", ...args); }
export const breakStatement = BreakStatement;
export function CallExpression(...args: Array<any>): Object { return builder("CallExpression", ...args); }
export const callExpression = CallExpression;
export function CatchClause(...args: Array<any>): Object { return builder("CatchClause", ...args); }
export const catchClause = CatchClause;
export function ConditionalExpression(...args: Array<any>): Object { return builder("ConditionalExpression", ...args); }
export const conditionalExpression = ConditionalExpression;
export function ContinueStatement(...args: Array<any>): Object { return builder("ContinueStatement", ...args); }
export const continueStatement = ContinueStatement;
export function DebuggerStatement(...args: Array<any>): Object { return builder("DebuggerStatement", ...args); }
export const debuggerStatement = DebuggerStatement;
export function DoWhileStatement(...args: Array<any>): Object { return builder("DoWhileStatement", ...args); }
export const doWhileStatement = DoWhileStatement;
export function EmptyStatement(...args: Array<any>): Object { return builder("EmptyStatement", ...args); }
export const emptyStatement = EmptyStatement;
export function ExpressionStatement(...args: Array<any>): Object { return builder("ExpressionStatement", ...args); }
export const expressionStatement = ExpressionStatement;
export function File(...args: Array<any>): Object { return builder("File", ...args); }
export const file = File;
export function ForInStatement(...args: Array<any>): Object { return builder("ForInStatement", ...args); }
export const forInStatement = ForInStatement;
export function ForStatement(...args: Array<any>): Object { return builder("ForStatement", ...args); }
export const forStatement = ForStatement;
export function FunctionDeclaration(...args: Array<any>): Object { return builder("FunctionDeclaration", ...args); }
export const functionDeclaration = FunctionDeclaration;
export function FunctionExpression(...args: Array<any>): Object { return builder("FunctionExpression", ...args); }
export const functionExpression = FunctionExpression;
export function Identifier(...args: Array<any>): Object { return builder("Identifier", ...args); }
export const identifier = Identifier;
export function IfStatement(...args: Array<any>): Object { return builder("IfStatement", ...args); }
export const ifStatement = IfStatement;
export function LabeledStatement(...args: Array<any>): Object { return builder("LabeledStatement", ...args); }
export const labeledStatement = LabeledStatement;
export function StringLiteral(...args: Array<any>): Object { return builder("StringLiteral", ...args); }
export const stringLiteral = StringLiteral;
export function NumericLiteral(...args: Array<any>): Object { return builder("NumericLiteral", ...args); }
export const numericLiteral = NumericLiteral;
export function NullLiteral(...args: Array<any>): Object { return builder("NullLiteral", ...args); }
export const nullLiteral = NullLiteral;
export function BooleanLiteral(...args: Array<any>): Object { return builder("BooleanLiteral", ...args); }
export const booleanLiteral = BooleanLiteral;
export function RegExpLiteral(...args: Array<any>): Object { return builder("RegExpLiteral", ...args); }
export const regExpLiteral = RegExpLiteral;
export function LogicalExpression(...args: Array<any>): Object { return builder("LogicalExpression", ...args); }
export const logicalExpression = LogicalExpression;
export function MemberExpression(...args: Array<any>): Object { return builder("MemberExpression", ...args); }
export const memberExpression = MemberExpression;
export function NewExpression(...args: Array<any>): Object { return builder("NewExpression", ...args); }
export const newExpression = NewExpression;
export function Program(...args: Array<any>): Object { return builder("Program", ...args); }
export const program = Program;
export function ObjectExpression(...args: Array<any>): Object { return builder("ObjectExpression", ...args); }
export const objectExpression = ObjectExpression;
export function ObjectMethod(...args: Array<any>): Object { return builder("ObjectMethod", ...args); }
export const objectMethod = ObjectMethod;
export function ObjectProperty(...args: Array<any>): Object { return builder("ObjectProperty", ...args); }
export const objectProperty = ObjectProperty;
export function RestElement(...args: Array<any>): Object { return builder("RestElement", ...args); }
export const restElement = RestElement;
export function ReturnStatement(...args: Array<any>): Object { return builder("ReturnStatement", ...args); }
export const returnStatement = ReturnStatement;
export function SequenceExpression(...args: Array<any>): Object { return builder("SequenceExpression", ...args); }
export const sequenceExpression = SequenceExpression;
export function SwitchCase(...args: Array<any>): Object { return builder("SwitchCase", ...args); }
export const switchCase = SwitchCase;
export function SwitchStatement(...args: Array<any>): Object { return builder("SwitchStatement", ...args); }
export const switchStatement = SwitchStatement;
export function ThisExpression(...args: Array<any>): Object { return builder("ThisExpression", ...args); }
export const thisExpression = ThisExpression;
export function ThrowStatement(...args: Array<any>): Object { return builder("ThrowStatement", ...args); }
export const throwStatement = ThrowStatement;
export function TryStatement(...args: Array<any>): Object { return builder("TryStatement", ...args); }
export const tryStatement = TryStatement;
export function UnaryExpression(...args: Array<any>): Object { return builder("UnaryExpression", ...args); }
export const unaryExpression = UnaryExpression;
export function UpdateExpression(...args: Array<any>): Object { return builder("UpdateExpression", ...args); }
export const updateExpression = UpdateExpression;
export function VariableDeclaration(...args: Array<any>): Object { return builder("VariableDeclaration", ...args); }
export const variableDeclaration = VariableDeclaration;
export function VariableDeclarator(...args: Array<any>): Object { return builder("VariableDeclarator", ...args); }
export const variableDeclarator = VariableDeclarator;
export function WhileStatement(...args: Array<any>): Object { return builder("WhileStatement", ...args); }
export const whileStatement = WhileStatement;
export function WithStatement(...args: Array<any>): Object { return builder("WithStatement", ...args); }
export const withStatement = WithStatement;
export function AssignmentPattern(...args: Array<any>): Object { return builder("AssignmentPattern", ...args); }
export const assignmentPattern = AssignmentPattern;
export function ArrayPattern(...args: Array<any>): Object { return builder("ArrayPattern", ...args); }
export const arrayPattern = ArrayPattern;
export function ArrowFunctionExpression(...args: Array<any>): Object { return builder("ArrowFunctionExpression", ...args); }
export const arrowFunctionExpression = ArrowFunctionExpression;
export function ClassBody(...args: Array<any>): Object { return builder("ClassBody", ...args); }
export const classBody = ClassBody;
export function ClassDeclaration(...args: Array<any>): Object { return builder("ClassDeclaration", ...args); }
export const classDeclaration = ClassDeclaration;
export function ClassExpression(...args: Array<any>): Object { return builder("ClassExpression", ...args); }
export const classExpression = ClassExpression;
export function ExportAllDeclaration(...args: Array<any>): Object { return builder("ExportAllDeclaration", ...args); }
export const exportAllDeclaration = ExportAllDeclaration;
export function ExportDefaultDeclaration(...args: Array<any>): Object { return builder("ExportDefaultDeclaration", ...args); }
export const exportDefaultDeclaration = ExportDefaultDeclaration;
export function ExportNamedDeclaration(...args: Array<any>): Object { return builder("ExportNamedDeclaration", ...args); }
export const exportNamedDeclaration = ExportNamedDeclaration;
export function ExportSpecifier(...args: Array<any>): Object { return builder("ExportSpecifier", ...args); }
export const exportSpecifier = ExportSpecifier;
export function ForOfStatement(...args: Array<any>): Object { return builder("ForOfStatement", ...args); }
export const forOfStatement = ForOfStatement;
export function ImportDeclaration(...args: Array<any>): Object { return builder("ImportDeclaration", ...args); }
export const importDeclaration = ImportDeclaration;
export function ImportDefaultSpecifier(...args: Array<any>): Object { return builder("ImportDefaultSpecifier", ...args); }
export const importDefaultSpecifier = ImportDefaultSpecifier;
export function ImportNamespaceSpecifier(...args: Array<any>): Object { return builder("ImportNamespaceSpecifier", ...args); }
export const importNamespaceSpecifier = ImportNamespaceSpecifier;
export function ImportSpecifier(...args: Array<any>): Object { return builder("ImportSpecifier", ...args); }
export const importSpecifier = ImportSpecifier;
export function MetaProperty(...args: Array<any>): Object { return builder("MetaProperty", ...args); }
export const metaProperty = MetaProperty;
export function ClassMethod(...args: Array<any>): Object { return builder("ClassMethod", ...args); }
export const classMethod = ClassMethod;
export function ObjectPattern(...args: Array<any>): Object { return builder("ObjectPattern", ...args); }
export const objectPattern = ObjectPattern;
export function SpreadElement(...args: Array<any>): Object { return builder("SpreadElement", ...args); }
export const spreadElement = SpreadElement;
export function Super(...args: Array<any>): Object { return builder("Super", ...args); }
export function TaggedTemplateExpression(...args: Array<any>): Object { return builder("TaggedTemplateExpression", ...args); }
export const taggedTemplateExpression = TaggedTemplateExpression;
export function TemplateElement(...args: Array<any>): Object { return builder("TemplateElement", ...args); }
export const templateElement = TemplateElement;
export function TemplateLiteral(...args: Array<any>): Object { return builder("TemplateLiteral", ...args); }
export const templateLiteral = TemplateLiteral;
export function YieldExpression(...args: Array<any>): Object { return builder("YieldExpression", ...args); }
export const yieldExpression = YieldExpression;
export function AnyTypeAnnotation(...args: Array<any>): Object { return builder("AnyTypeAnnotation", ...args); }
export const anyTypeAnnotation = AnyTypeAnnotation;
export function ArrayTypeAnnotation(...args: Array<any>): Object { return builder("ArrayTypeAnnotation", ...args); }
export const arrayTypeAnnotation = ArrayTypeAnnotation;
export function BooleanTypeAnnotation(...args: Array<any>): Object { return builder("BooleanTypeAnnotation", ...args); }
export const booleanTypeAnnotation = BooleanTypeAnnotation;
export function BooleanLiteralTypeAnnotation(...args: Array<any>): Object { return builder("BooleanLiteralTypeAnnotation", ...args); }
export const booleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
export function NullLiteralTypeAnnotation(...args: Array<any>): Object { return builder("NullLiteralTypeAnnotation", ...args); }
export const nullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
export function ClassImplements(...args: Array<any>): Object { return builder("ClassImplements", ...args); }
export const classImplements = ClassImplements;
export function DeclareClass(...args: Array<any>): Object { return builder("DeclareClass", ...args); }
export const declareClass = DeclareClass;
export function DeclareFunction(...args: Array<any>): Object { return builder("DeclareFunction", ...args); }
export const declareFunction = DeclareFunction;
export function DeclareInterface(...args: Array<any>): Object { return builder("DeclareInterface", ...args); }
export const declareInterface = DeclareInterface;
export function DeclareModule(...args: Array<any>): Object { return builder("DeclareModule", ...args); }
export const declareModule = DeclareModule;
export function DeclareModuleExports(...args: Array<any>): Object { return builder("DeclareModuleExports", ...args); }
export const declareModuleExports = DeclareModuleExports;
export function DeclareTypeAlias(...args: Array<any>): Object { return builder("DeclareTypeAlias", ...args); }
export const declareTypeAlias = DeclareTypeAlias;
export function DeclareOpaqueType(...args: Array<any>): Object { return builder("DeclareOpaqueType", ...args); }
export const declareOpaqueType = DeclareOpaqueType;
export function DeclareVariable(...args: Array<any>): Object { return builder("DeclareVariable", ...args); }
export const declareVariable = DeclareVariable;
export function DeclareExportDeclaration(...args: Array<any>): Object { return builder("DeclareExportDeclaration", ...args); }
export const declareExportDeclaration = DeclareExportDeclaration;
export function DeclareExportAllDeclaration(...args: Array<any>): Object { return builder("DeclareExportAllDeclaration", ...args); }
export const declareExportAllDeclaration = DeclareExportAllDeclaration;
export function DeclaredPredicate(...args: Array<any>): Object { return builder("DeclaredPredicate", ...args); }
export const declaredPredicate = DeclaredPredicate;
export function ExistsTypeAnnotation(...args: Array<any>): Object { return builder("ExistsTypeAnnotation", ...args); }
export const existsTypeAnnotation = ExistsTypeAnnotation;
export function FunctionTypeAnnotation(...args: Array<any>): Object { return builder("FunctionTypeAnnotation", ...args); }
export const functionTypeAnnotation = FunctionTypeAnnotation;
export function FunctionTypeParam(...args: Array<any>): Object { return builder("FunctionTypeParam", ...args); }
export const functionTypeParam = FunctionTypeParam;
export function GenericTypeAnnotation(...args: Array<any>): Object { return builder("GenericTypeAnnotation", ...args); }
export const genericTypeAnnotation = GenericTypeAnnotation;
export function InferredPredicate(...args: Array<any>): Object { return builder("InferredPredicate", ...args); }
export const inferredPredicate = InferredPredicate;
export function InterfaceExtends(...args: Array<any>): Object { return builder("InterfaceExtends", ...args); }
export const interfaceExtends = InterfaceExtends;
export function InterfaceDeclaration(...args: Array<any>): Object { return builder("InterfaceDeclaration", ...args); }
export const interfaceDeclaration = InterfaceDeclaration;
export function IntersectionTypeAnnotation(...args: Array<any>): Object { return builder("IntersectionTypeAnnotation", ...args); }
export const intersectionTypeAnnotation = IntersectionTypeAnnotation;
export function MixedTypeAnnotation(...args: Array<any>): Object { return builder("MixedTypeAnnotation", ...args); }
export const mixedTypeAnnotation = MixedTypeAnnotation;
export function EmptyTypeAnnotation(...args: Array<any>): Object { return builder("EmptyTypeAnnotation", ...args); }
export const emptyTypeAnnotation = EmptyTypeAnnotation;
export function NullableTypeAnnotation(...args: Array<any>): Object { return builder("NullableTypeAnnotation", ...args); }
export const nullableTypeAnnotation = NullableTypeAnnotation;
export function NumberLiteralTypeAnnotation(...args: Array<any>): Object { return builder("NumberLiteralTypeAnnotation", ...args); }
export const numberLiteralTypeAnnotation = NumberLiteralTypeAnnotation;
export function NumberTypeAnnotation(...args: Array<any>): Object { return builder("NumberTypeAnnotation", ...args); }
export const numberTypeAnnotation = NumberTypeAnnotation;
export function ObjectTypeAnnotation(...args: Array<any>): Object { return builder("ObjectTypeAnnotation", ...args); }
export const objectTypeAnnotation = ObjectTypeAnnotation;
export function ObjectTypeCallProperty(...args: Array<any>): Object { return builder("ObjectTypeCallProperty", ...args); }
export const objectTypeCallProperty = ObjectTypeCallProperty;
export function ObjectTypeIndexer(...args: Array<any>): Object { return builder("ObjectTypeIndexer", ...args); }
export const objectTypeIndexer = ObjectTypeIndexer;
export function ObjectTypeProperty(...args: Array<any>): Object { return builder("ObjectTypeProperty", ...args); }
export const objectTypeProperty = ObjectTypeProperty;
export function ObjectTypeSpreadProperty(...args: Array<any>): Object { return builder("ObjectTypeSpreadProperty", ...args); }
export const objectTypeSpreadProperty = ObjectTypeSpreadProperty;
export function OpaqueType(...args: Array<any>): Object { return builder("OpaqueType", ...args); }
export const opaqueType = OpaqueType;
export function QualifiedTypeIdentifier(...args: Array<any>): Object { return builder("QualifiedTypeIdentifier", ...args); }
export const qualifiedTypeIdentifier = QualifiedTypeIdentifier;
export function StringLiteralTypeAnnotation(...args: Array<any>): Object { return builder("StringLiteralTypeAnnotation", ...args); }
export const stringLiteralTypeAnnotation = StringLiteralTypeAnnotation;
export function StringTypeAnnotation(...args: Array<any>): Object { return builder("StringTypeAnnotation", ...args); }
export const stringTypeAnnotation = StringTypeAnnotation;
export function ThisTypeAnnotation(...args: Array<any>): Object { return builder("ThisTypeAnnotation", ...args); }
export const thisTypeAnnotation = ThisTypeAnnotation;
export function TupleTypeAnnotation(...args: Array<any>): Object { return builder("TupleTypeAnnotation", ...args); }
export const tupleTypeAnnotation = TupleTypeAnnotation;
export function TypeofTypeAnnotation(...args: Array<any>): Object { return builder("TypeofTypeAnnotation", ...args); }
export const typeofTypeAnnotation = TypeofTypeAnnotation;
export function TypeAlias(...args: Array<any>): Object { return builder("TypeAlias", ...args); }
export const typeAlias = TypeAlias;
export function TypeAnnotation(...args: Array<any>): Object { return builder("TypeAnnotation", ...args); }
export const typeAnnotation = TypeAnnotation;
export function TypeCastExpression(...args: Array<any>): Object { return builder("TypeCastExpression", ...args); }
export const typeCastExpression = TypeCastExpression;
export function TypeParameter(...args: Array<any>): Object { return builder("TypeParameter", ...args); }
export const typeParameter = TypeParameter;
export function TypeParameterDeclaration(...args: Array<any>): Object { return builder("TypeParameterDeclaration", ...args); }
export const typeParameterDeclaration = TypeParameterDeclaration;
export function TypeParameterInstantiation(...args: Array<any>): Object { return builder("TypeParameterInstantiation", ...args); }
export const typeParameterInstantiation = TypeParameterInstantiation;
export function UnionTypeAnnotation(...args: Array<any>): Object { return builder("UnionTypeAnnotation", ...args); }
export const unionTypeAnnotation = UnionTypeAnnotation;
export function VoidTypeAnnotation(...args: Array<any>): Object { return builder("VoidTypeAnnotation", ...args); }
export const voidTypeAnnotation = VoidTypeAnnotation;
export function JSXAttribute(...args: Array<any>): Object { return builder("JSXAttribute", ...args); }
export const jSXAttribute = JSXAttribute;
export function JSXClosingElement(...args: Array<any>): Object { return builder("JSXClosingElement", ...args); }
export const jSXClosingElement = JSXClosingElement;
export function JSXElement(...args: Array<any>): Object { return builder("JSXElement", ...args); }
export const jSXElement = JSXElement;
export function JSXEmptyExpression(...args: Array<any>): Object { return builder("JSXEmptyExpression", ...args); }
export const jSXEmptyExpression = JSXEmptyExpression;
export function JSXExpressionContainer(...args: Array<any>): Object { return builder("JSXExpressionContainer", ...args); }
export const jSXExpressionContainer = JSXExpressionContainer;
export function JSXSpreadChild(...args: Array<any>): Object { return builder("JSXSpreadChild", ...args); }
export const jSXSpreadChild = JSXSpreadChild;
export function JSXIdentifier(...args: Array<any>): Object { return builder("JSXIdentifier", ...args); }
export const jSXIdentifier = JSXIdentifier;
export function JSXMemberExpression(...args: Array<any>): Object { return builder("JSXMemberExpression", ...args); }
export const jSXMemberExpression = JSXMemberExpression;
export function JSXNamespacedName(...args: Array<any>): Object { return builder("JSXNamespacedName", ...args); }
export const jSXNamespacedName = JSXNamespacedName;
export function JSXOpeningElement(...args: Array<any>): Object { return builder("JSXOpeningElement", ...args); }
export const jSXOpeningElement = JSXOpeningElement;
export function JSXSpreadAttribute(...args: Array<any>): Object { return builder("JSXSpreadAttribute", ...args); }
export const jSXSpreadAttribute = JSXSpreadAttribute;
export function JSXText(...args: Array<any>): Object { return builder("JSXText", ...args); }
export const jSXText = JSXText;
export function JSXFragment(...args: Array<any>): Object { return builder("JSXFragment", ...args); }
export const jSXFragment = JSXFragment;
export function JSXOpeningFragment(...args: Array<any>): Object { return builder("JSXOpeningFragment", ...args); }
export const jSXOpeningFragment = JSXOpeningFragment;
export function JSXClosingFragment(...args: Array<any>): Object { return builder("JSXClosingFragment", ...args); }
export const jSXClosingFragment = JSXClosingFragment;
export function Noop(...args: Array<any>): Object { return builder("Noop", ...args); }
export const noop = Noop;
export function ParenthesizedExpression(...args: Array<any>): Object { return builder("ParenthesizedExpression", ...args); }
export const parenthesizedExpression = ParenthesizedExpression;
export function AwaitExpression(...args: Array<any>): Object { return builder("AwaitExpression", ...args); }
export const awaitExpression = AwaitExpression;
export function BindExpression(...args: Array<any>): Object { return builder("BindExpression", ...args); }
export const bindExpression = BindExpression;
export function ClassProperty(...args: Array<any>): Object { return builder("ClassProperty", ...args); }
export const classProperty = ClassProperty;
export function Import(...args: Array<any>): Object { return builder("Import", ...args); }
export function Decorator(...args: Array<any>): Object { return builder("Decorator", ...args); }
export const decorator = Decorator;
export function DoExpression(...args: Array<any>): Object { return builder("DoExpression", ...args); }
export const doExpression = DoExpression;
export function ExportDefaultSpecifier(...args: Array<any>): Object { return builder("ExportDefaultSpecifier", ...args); }
export const exportDefaultSpecifier = ExportDefaultSpecifier;
export function ExportNamespaceSpecifier(...args: Array<any>): Object { return builder("ExportNamespaceSpecifier", ...args); }
export const exportNamespaceSpecifier = ExportNamespaceSpecifier;
export function TSParameterProperty(...args: Array<any>): Object { return builder("TSParameterProperty", ...args); }
export const tSParameterProperty = TSParameterProperty;
export function TSDeclareFunction(...args: Array<any>): Object { return builder("TSDeclareFunction", ...args); }
export const tSDeclareFunction = TSDeclareFunction;
export function TSDeclareMethod(...args: Array<any>): Object { return builder("TSDeclareMethod", ...args); }
export const tSDeclareMethod = TSDeclareMethod;
export function TSQualifiedName(...args: Array<any>): Object { return builder("TSQualifiedName", ...args); }
export const tSQualifiedName = TSQualifiedName;
export function TSCallSignatureDeclaration(...args: Array<any>): Object { return builder("TSCallSignatureDeclaration", ...args); }
export const tSCallSignatureDeclaration = TSCallSignatureDeclaration;
export function TSConstructSignatureDeclaration(...args: Array<any>): Object { return builder("TSConstructSignatureDeclaration", ...args); }
export const tSConstructSignatureDeclaration = TSConstructSignatureDeclaration;
export function TSPropertySignature(...args: Array<any>): Object { return builder("TSPropertySignature", ...args); }
export const tSPropertySignature = TSPropertySignature;
export function TSMethodSignature(...args: Array<any>): Object { return builder("TSMethodSignature", ...args); }
export const tSMethodSignature = TSMethodSignature;
export function TSIndexSignature(...args: Array<any>): Object { return builder("TSIndexSignature", ...args); }
export const tSIndexSignature = TSIndexSignature;
export function TSAnyKeyword(...args: Array<any>): Object { return builder("TSAnyKeyword", ...args); }
export const tSAnyKeyword = TSAnyKeyword;
export function TSNumberKeyword(...args: Array<any>): Object { return builder("TSNumberKeyword", ...args); }
export const tSNumberKeyword = TSNumberKeyword;
export function TSObjectKeyword(...args: Array<any>): Object { return builder("TSObjectKeyword", ...args); }
export const tSObjectKeyword = TSObjectKeyword;
export function TSBooleanKeyword(...args: Array<any>): Object { return builder("TSBooleanKeyword", ...args); }
export const tSBooleanKeyword = TSBooleanKeyword;
export function TSStringKeyword(...args: Array<any>): Object { return builder("TSStringKeyword", ...args); }
export const tSStringKeyword = TSStringKeyword;
export function TSSymbolKeyword(...args: Array<any>): Object { return builder("TSSymbolKeyword", ...args); }
export const tSSymbolKeyword = TSSymbolKeyword;
export function TSVoidKeyword(...args: Array<any>): Object { return builder("TSVoidKeyword", ...args); }
export const tSVoidKeyword = TSVoidKeyword;
export function TSUndefinedKeyword(...args: Array<any>): Object { return builder("TSUndefinedKeyword", ...args); }
export const tSUndefinedKeyword = TSUndefinedKeyword;
export function TSNullKeyword(...args: Array<any>): Object { return builder("TSNullKeyword", ...args); }
export const tSNullKeyword = TSNullKeyword;
export function TSNeverKeyword(...args: Array<any>): Object { return builder("TSNeverKeyword", ...args); }
export const tSNeverKeyword = TSNeverKeyword;
export function TSThisType(...args: Array<any>): Object { return builder("TSThisType", ...args); }
export const tSThisType = TSThisType;
export function TSFunctionType(...args: Array<any>): Object { return builder("TSFunctionType", ...args); }
export const tSFunctionType = TSFunctionType;
export function TSConstructorType(...args: Array<any>): Object { return builder("TSConstructorType", ...args); }
export const tSConstructorType = TSConstructorType;
export function TSTypeReference(...args: Array<any>): Object { return builder("TSTypeReference", ...args); }
export const tSTypeReference = TSTypeReference;
export function TSTypePredicate(...args: Array<any>): Object { return builder("TSTypePredicate", ...args); }
export const tSTypePredicate = TSTypePredicate;
export function TSTypeQuery(...args: Array<any>): Object { return builder("TSTypeQuery", ...args); }
export const tSTypeQuery = TSTypeQuery;
export function TSTypeLiteral(...args: Array<any>): Object { return builder("TSTypeLiteral", ...args); }
export const tSTypeLiteral = TSTypeLiteral;
export function TSArrayType(...args: Array<any>): Object { return builder("TSArrayType", ...args); }
export const tSArrayType = TSArrayType;
export function TSTupleType(...args: Array<any>): Object { return builder("TSTupleType", ...args); }
export const tSTupleType = TSTupleType;
export function TSUnionType(...args: Array<any>): Object { return builder("TSUnionType", ...args); }
export const tSUnionType = TSUnionType;
export function TSIntersectionType(...args: Array<any>): Object { return builder("TSIntersectionType", ...args); }
export const tSIntersectionType = TSIntersectionType;
export function TSParenthesizedType(...args: Array<any>): Object { return builder("TSParenthesizedType", ...args); }
export const tSParenthesizedType = TSParenthesizedType;
export function TSTypeOperator(...args: Array<any>): Object { return builder("TSTypeOperator", ...args); }
export const tSTypeOperator = TSTypeOperator;
export function TSIndexedAccessType(...args: Array<any>): Object { return builder("TSIndexedAccessType", ...args); }
export const tSIndexedAccessType = TSIndexedAccessType;
export function TSMappedType(...args: Array<any>): Object { return builder("TSMappedType", ...args); }
export const tSMappedType = TSMappedType;
export function TSLiteralType(...args: Array<any>): Object { return builder("TSLiteralType", ...args); }
export const tSLiteralType = TSLiteralType;
export function TSExpressionWithTypeArguments(...args: Array<any>): Object { return builder("TSExpressionWithTypeArguments", ...args); }
export const tSExpressionWithTypeArguments = TSExpressionWithTypeArguments;
export function TSInterfaceDeclaration(...args: Array<any>): Object { return builder("TSInterfaceDeclaration", ...args); }
export const tSInterfaceDeclaration = TSInterfaceDeclaration;
export function TSInterfaceBody(...args: Array<any>): Object { return builder("TSInterfaceBody", ...args); }
export const tSInterfaceBody = TSInterfaceBody;
export function TSTypeAliasDeclaration(...args: Array<any>): Object { return builder("TSTypeAliasDeclaration", ...args); }
export const tSTypeAliasDeclaration = TSTypeAliasDeclaration;
export function TSAsExpression(...args: Array<any>): Object { return builder("TSAsExpression", ...args); }
export const tSAsExpression = TSAsExpression;
export function TSTypeAssertion(...args: Array<any>): Object { return builder("TSTypeAssertion", ...args); }
export const tSTypeAssertion = TSTypeAssertion;
export function TSEnumDeclaration(...args: Array<any>): Object { return builder("TSEnumDeclaration", ...args); }
export const tSEnumDeclaration = TSEnumDeclaration;
export function TSEnumMember(...args: Array<any>): Object { return builder("TSEnumMember", ...args); }
export const tSEnumMember = TSEnumMember;
export function TSModuleDeclaration(...args: Array<any>): Object { return builder("TSModuleDeclaration", ...args); }
export const tSModuleDeclaration = TSModuleDeclaration;
export function TSModuleBlock(...args: Array<any>): Object { return builder("TSModuleBlock", ...args); }
export const tSModuleBlock = TSModuleBlock;
export function TSImportEqualsDeclaration(...args: Array<any>): Object { return builder("TSImportEqualsDeclaration", ...args); }
export const tSImportEqualsDeclaration = TSImportEqualsDeclaration;
export function TSExternalModuleReference(...args: Array<any>): Object { return builder("TSExternalModuleReference", ...args); }
export const tSExternalModuleReference = TSExternalModuleReference;
export function TSNonNullExpression(...args: Array<any>): Object { return builder("TSNonNullExpression", ...args); }
export const tSNonNullExpression = TSNonNullExpression;
export function TSExportAssignment(...args: Array<any>): Object { return builder("TSExportAssignment", ...args); }
export const tSExportAssignment = TSExportAssignment;
export function TSNamespaceExportDeclaration(...args: Array<any>): Object { return builder("TSNamespaceExportDeclaration", ...args); }
export const tSNamespaceExportDeclaration = TSNamespaceExportDeclaration;
export function TSTypeAnnotation(...args: Array<any>): Object { return builder("TSTypeAnnotation", ...args); }
export const tSTypeAnnotation = TSTypeAnnotation;
export function TSTypeParameterInstantiation(...args: Array<any>): Object { return builder("TSTypeParameterInstantiation", ...args); }
export const tSTypeParameterInstantiation = TSTypeParameterInstantiation;
export function TSTypeParameterDeclaration(...args: Array<any>): Object { return builder("TSTypeParameterDeclaration", ...args); }
export const tSTypeParameterDeclaration = TSTypeParameterDeclaration;
export function TSTypeParameter(...args: Array<any>): Object { return builder("TSTypeParameter", ...args); }
export const tSTypeParameter = TSTypeParameter;
export function isNumberLiteral(node: Object, opts: Object): boolean {
    console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
    return is("NumberLiteral", node, opts);
  }
export function assertNumberLiteral(node: Object, opts: Object): void {
    console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
    assert("NumberLiteral", node, opts);
  }
export function NumberLiteral(...args: Array<any>): Object {
    console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
    return NumberLiteral("NumberLiteral", ...args);
  }
export const numberLiteral = NumberLiteral;
export function isRegexLiteral(node: Object, opts: Object): boolean {
    console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
    return is("RegexLiteral", node, opts);
  }
export function assertRegexLiteral(node: Object, opts: Object): void {
    console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
    assert("RegexLiteral", node, opts);
  }
export function RegexLiteral(...args: Array<any>): Object {
    console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
    return RegexLiteral("RegexLiteral", ...args);
  }
export const regexLiteral = RegexLiteral;
export function isRestProperty(node: Object, opts: Object): boolean {
    console.trace("The node type RestProperty has been renamed to RestElement");
    return is("RestProperty", node, opts);
  }
export function assertRestProperty(node: Object, opts: Object): void {
    console.trace("The node type RestProperty has been renamed to RestElement");
    assert("RestProperty", node, opts);
  }
export function RestProperty(...args: Array<any>): Object {
    console.trace("The node type RestProperty has been renamed to RestElement");
    return RestProperty("RestProperty", ...args);
  }
export const restProperty = RestProperty;
export function isSpreadProperty(node: Object, opts: Object): boolean {
    console.trace("The node type SpreadProperty has been renamed to SpreadElement");
    return is("SpreadProperty", node, opts);
  }
export function assertSpreadProperty(node: Object, opts: Object): void {
    console.trace("The node type SpreadProperty has been renamed to SpreadElement");
    assert("SpreadProperty", node, opts);
  }
export function SpreadProperty(...args: Array<any>): Object {
    console.trace("The node type SpreadProperty has been renamed to SpreadElement");
    return SpreadProperty("SpreadProperty", ...args);
  }
export const spreadProperty = SpreadProperty;
