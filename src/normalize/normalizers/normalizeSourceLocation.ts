import { flattenLiteral, makeSingle } from "normalize/helpers/transforms";
import { Normalizer } from "types";

export const normalizeSourceLocation: Normalizer = (node, normalized) => {
  flattenLiteral(normalized, "text");
  makeSingle(normalized, "source");
};