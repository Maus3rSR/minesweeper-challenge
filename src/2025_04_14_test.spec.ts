import { expect, it } from "vitest";

function resolveMineCase(
  mineValue: string,
  previousMineValue: string | undefined
) {
  if (previousMineValue === "*") {
    return mineValue === "." ? "1" : "*";
  }
  return mineValue === "." ? "0" : "*";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";
  let i = 0;

  while (mineField[i]) {
    resolvedMineField += resolveMineCase(mineField[i], mineField[i - 1]);
    i++;
  }

  return resolvedMineField;
}

it.each([
  ["*", "*"], // Une mine
  [".", "0"], // Une case vide
  ["..", "00"], // Une ligne vide
  ["...", "000"], // Une ligne vide
  ["**", "**"], // Une ligne de mines
  ["*.", "*1"], // Une mine à gauche
])("Given mine field %s should resolve as %s", (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
