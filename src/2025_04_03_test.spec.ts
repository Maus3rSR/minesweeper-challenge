import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  return mineField
    .replaceAll("*.*", "*2*")
    .replaceAll("*.", "*1")
    .replaceAll(".*", "1*")
    .replaceAll(".", "0");
}

/**
 * Mine field should resolve as:
 *
 *      *      resolve as    *
 *      **     resolve as    **
 *      .      resolve as    0
 *      ..     resolve as    00
 *      .*     resolve as    1*
 *      *.     resolve as    *1
 *      .*.    resolve as    1*1
 *      *.*    resolve as    *2*
 *      **.*   resolve as    **2*
 */
it.each([
  ["*", "*"],
  ["**", "**"],
  [".", "0"],
  ["..", "00"],
  [".*", "1*"],
  ["*.", "*1"],
  [".*.", "1*1"],
  ["*.*", "*2*"],
  ["**.*", "**2*"],
])("Given mine field %i should resolve as %i", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
