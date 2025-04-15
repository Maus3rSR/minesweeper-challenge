import { expect, it } from "vitest";

function resolveMineCase(mineValue: string) {
  return mineValue === "." ? "0" : "*";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";

  if (mineField[0] + mineField[1] + mineField[2] === "***")
    resolvedMineField =
      resolveMineCase(mineField[0]) +
      resolveMineCase(mineField[1]) +
      resolveMineCase(mineField[2]);
  else if (mineField[0] + mineField[1] === "**")
    resolvedMineField =
      resolveMineCase(mineField[0]) + resolveMineCase(mineField[1]);
  else if (mineField[0] === "*")
    resolvedMineField = resolveMineCase(mineField[0]);
  else if (mineField[0] + mineField[1] + mineField[2] === "...")
    resolvedMineField =
      resolveMineCase(mineField[0]) +
      resolveMineCase(mineField[1]) +
      resolveMineCase(mineField[2]);
  else if (mineField[0] + mineField[1] === "..")
    resolvedMineField =
      resolveMineCase(mineField[0]) + resolveMineCase(mineField[1]);
  else if (mineField[0] === ".")
    resolvedMineField = resolveMineCase(mineField[0]);

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
