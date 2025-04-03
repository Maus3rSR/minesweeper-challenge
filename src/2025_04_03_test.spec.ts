import { expect, it } from "vitest";

function convertCellToMineCount(
  previousCell: string,
  nextCell: string
): string {
  let mineCount = 0;

  if (previousCell === "*") mineCount++;
  if (nextCell === "*") mineCount++;

  return mineCount.toString();
}

function mineSweeperResolver(mineField: string): string {
  const mineFieldList = mineField.split("");

  return mineFieldList
    .map((cell, index) => {
      if (cell === "*") return cell;

      return convertCellToMineCount(
        mineFieldList[index - 1],
        mineFieldList[index + 1]
      );
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
