import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  if (mineField === ".") return "0";

  return mineField;
}

it.each([
  ["*", "*"], // Une mine
  [".", "0"], // Une case vide
])("Given mine field %i should resolve as %i", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
