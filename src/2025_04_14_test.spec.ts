import { expect, it } from "vitest";

type ResolveMineCaseProps = {
  mineValueToResolve: string;
  valueFromLeft: string | undefined;
  valueFromRight: string | undefined;
};

function resolveMineCase({
  mineValueToResolve,
  valueFromLeft,
  valueFromRight,
}: ResolveMineCaseProps) {
  let mineCount = 0;

  mineCount += valueFromLeft === "*" ? 1 : 0;
  mineCount += valueFromRight === "*" ? 1 : 0;

  return mineValueToResolve === "." ? mineCount : "*";
}

function mineSweeperResolver(mineField: string): string {
  let resolvedMineField = "";
  let i = 0;

  while (mineField[i]) {
    if (mineField[i] === "\n") {
      resolvedMineField += "\n";
    } else {
      let leftIndex = i - 1;
      let rightIndex = i + 1;

      if (mineField[leftIndex] === "\n") {
        leftIndex -= 1;
      } else if (mineField[rightIndex] === "\n") {
        rightIndex += 1;
      }

      resolvedMineField += resolveMineCase({
        mineValueToResolve: mineField[i],
        valueFromLeft: mineField[leftIndex],
        valueFromRight: mineField[rightIndex],
      });
    }

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
  [".*", "1*"], // Une mine à droite
  ["*.*", "*2*"], // Une mine à gauche et une mine à droite
  ["*.*.*", "*2*2*"], // Alterner une mine à gauche et une mine à droite d'une case vide
  [".\n.", "0\n0"], // Deux lignes de cases vides
  ["*\n*", "*\n*"], // Deux lignes de mines
  [".\n*", "1\n*"], // Une ligne d'une case avec rien et une ligne d'une case avec une mine
  ["*\n.", "*\n1"], // Une ligne d'une case avec une mine et une ligne d'une case avec rien
  ["*.\n*.", "*1\n*1"],
])(`Given mine field %s should resolve as %s`, (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
