import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  const mineFieldList = mineField.split("");

  return mineFieldList
    .map((cell, index) => {
      if (cell === "*") return cell;

      const previous = mineFieldList[index - 1];
      const next = mineFieldList[index + 1];

      let mineCount = 0;

      if (previous === "*") mineCount++;
      if (next === "*") mineCount++;

      return mineCount.toString();
    })
    .join("");
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
