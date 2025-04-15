import { expect, it } from "vitest";

function resolveMineCase(mineValue: string) {
  return mineValue === "." ? "0" : "*";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";

  let i = 0;

  while (mineField[i]) {
    if (mineField[i] === "*")
      resolvedMineField += resolveMineCase(mineField[i]);
    i++;
  }

  let j = 0;

  while (mineField[j]) {
    if (mineField[j] === ".")
      resolvedMineField += resolveMineCase(mineField[j]);
    j++;
  }

  return resolvedMineField;
}

it.each([
  ["*", "*"], // Une mine
  [".", "0"], // Une case vide
  ["..", "00"], // Une ligne vide
  ["...", "000"], // Une ligne vide
  ["**", "**"], // Une ligne de mines
])("Given mine field %s should resolve as %s", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
