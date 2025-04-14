import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  if (mineField === ".") return "0";
  if (mineField === "..") return "00";

  return mineField;
}

it.each([
  ["*", "*"], // Une mine
  [".", "0"], // Une case vide
  ["..", "00"], // Une ligne vide
  ["**", "**"], // Une ligne de deux mines
])("Given mine field %i should resolve as %i", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
