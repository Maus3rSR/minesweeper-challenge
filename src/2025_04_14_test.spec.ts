import { expect, it } from "vitest";

function resolveMineCase(mineValue: string) {
  return mineValue === "." ? "0" : "*";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";

  if (mineField[0] === "*") resolvedMineField += resolveMineCase(mineField[0]);
  if (mineField[1] === "*") resolvedMineField += resolveMineCase(mineField[1]);
  if (mineField[2] === "*") resolvedMineField += resolveMineCase(mineField[2]);

  if (mineField[0] === ".") resolvedMineField += resolveMineCase(mineField[0]);
  if (mineField[1] === ".") resolvedMineField += resolveMineCase(mineField[1]);
  if (mineField[2] === ".") resolvedMineField += resolveMineCase(mineField[2]);

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
