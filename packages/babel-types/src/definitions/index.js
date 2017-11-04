// @flow
import toFastProperties from "to-fast-properties";
import "./core";
import "./es2015";
import "./flow";
import "./jsx";
import "./misc";
import "./experimental";
import "./typescript";
import {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
} from "./utils";

// We do this here, because at this point the visitor keys should be ready and setup
toFastProperties(VISITOR_KEYS);

export {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
};
