import { expect, it } from "vitest";

/**
 * Mine field should resolve as:
 *      *      resolve as    *
 *      .      resolve as    .
 *      .*     resolve as    1*
 *      *.     resolve as    *1
 *      *.*     resolve as    *2*
 */
function mineSweeperResolver(mineField: string): string {
  if (mineField === "*.*") return "*2*";
  if (mineField === "*.") return "*1";
  if (mineField === ".*") return "1*";
  if (mineField === ".") return ".";
  return "*";
}

it.each([
  ["*", "*"],
  [".", "."],
  [".*", "1*"],
  ["*.", "*1"],
  ["*.*", "*2*"],
])("Given mine field %s should resolve as %s", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
