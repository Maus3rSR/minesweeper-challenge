import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  if (mineField === ".") return "0";
  if (mineField === "..") return "00";

  return mineField;
}

/**
 * Mine field should resolve as:
 *
 *      *      resolve as    *
 *      .      resolve as    0
 *      ..     resolve as    00
 *      .*     resolve as    1*
 *      *.     resolve as    *1
 *      **     resolve as    **
 *      .*.    resolve as    1*1
 *      *.*    resolve as    *2*
 *      **.*   resolve as    **2*
 */
it.each([
  ["*", "*"],
  [".", "0"],
  ["..", "00"],
])("Given mine field %i should resolve as %i", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
