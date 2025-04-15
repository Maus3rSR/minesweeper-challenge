import { expect, it } from "vitest";

function resolveMineCase() {
  return "0";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";

  if (mineField[0] + mineField[1] + mineField[2] === "***")
    resolvedMineField = "*" + "*" + "*";
  else if (mineField[0] + mineField[1] === "**") resolvedMineField = "*" + "*";
  else if (mineField[0] === "*") resolvedMineField = "*";
  else if (mineField[0] + mineField[1] + mineField[2] === "...")
    resolvedMineField =
      resolveMineCase() + resolveMineCase() + resolveMineCase();
  else if (mineField[0] + mineField[1] === "..")
    resolvedMineField = resolveMineCase() + resolveMineCase();
  else if (mineField[0] === ".") resolvedMineField = resolveMineCase();

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
