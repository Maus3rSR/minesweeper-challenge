import { expect, it } from "vitest";

function resolveMineField() {
  return "0";
}

function mineSweeperResolver(mineField: string): string {
  if (mineField[0] + mineField[1] + mineField[2] === "...")
    return resolveMineField() + resolveMineField() + resolveMineField();
  if (mineField[0] + mineField[1] === "..")
    return resolveMineField() + resolveMineField();
  if (mineField[0] === ".") return resolveMineField();

  return mineField;
}

it.each([
  ["*", "*"], // Une mine
  [".", "0"], // Une case vide
  ["..", "00"], // Une ligne vide
  ["...", "000"], // Une ligne vide
  ["**", "**"], // Une ligne de deux mines
])("Given mine field %s should resolve as %s", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
