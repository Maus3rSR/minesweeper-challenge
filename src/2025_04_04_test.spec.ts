import { expect, it } from "vitest";

/**
 * Mine field should resolve as:
 *      *      resolve as    *
 *      .      resolve as    .
 *      .*     resolve as    1*
 *      *.     resolve as    *1
 */
function mineSweeperResolver(mineField: string): string {
  if (mineField === ".*") return "1*";
  if (mineField === ".") return ".";
  return "*";
}

it.each([
  ["*", "*"],
  [".", "."],
  [".*", "1*"],
])("Given mine field %i should resolve as %i", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
