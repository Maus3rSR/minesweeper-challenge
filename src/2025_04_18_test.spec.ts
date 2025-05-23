import { expect, it } from "vitest";

type ResolveMineCaseProps = {
  mineValueToResolve: string;
  valueFromLeft: string | undefined;
  valueFromRight: string | undefined;
  valueFromBottom: string | undefined;
  valueFromTop: string | undefined;
};

function isABomb(char: string | undefined) {
  return char === "*";
}

function resolveMineCase({
  mineValueToResolve,
  valueFromLeft,
  valueFromRight,
  valueFromBottom,
  valueFromTop,
}: ResolveMineCaseProps) {
  if (mineValueToResolve === "*") return mineValueToResolve;

  const aroundValues = [
    valueFromLeft,
    valueFromRight,
    valueFromBottom,
    valueFromTop,
  ];

  return aroundValues.reduce((count, value) => {
    return count + (isABomb(value) ? 1 : 0);
  }, 0);
}

function mineSweeperResolver(mineField: string): string {
  const lines = mineField.split("\n");
  let resolvedMineField: string[] = [];

  let i = 0;
  let lineNumber = 0;

  while (lines[lineNumber]) {
    resolvedMineField[lineNumber] = "";
    while (lines[lineNumber][i]) {
      resolvedMineField[lineNumber] += resolveMineCase({
        mineValueToResolve: lines[lineNumber][i],
        valueFromLeft: lines[lineNumber][i - 1],
        valueFromRight: lines[lineNumber][i + 1],
        valueFromBottom: lines[lineNumber + 1] && lines[lineNumber + 1][i],
        valueFromTop: lines[lineNumber - 1] && lines[lineNumber - 1][i],
      });

      i++;
    }

    i = 0;
    lineNumber += 1;
  }

  return resolvedMineField.join("\n");
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
  [".\n*", "1\n*"], // Une mine en dessous
  ["*\n.", "*\n1"], // Une mine au dessus
  ["*.\n*.", "*1\n*1"], // Deux lignes avec une mine à gauche
  [".*\n.*", "1*\n1*"], // Deux lignes avec une mine à droite
  ["*.\n.*", "*2\n2*"], // Une ligne avec une mine à gauche et une ligne avec une mine à droite
  ["*.*\n*.*", "*2*\n*2*"], // Deux lignes avec une mine à chaque extrémité
  ["...\n.*.\n...", "010\n1*1\n010"], // Trois lignes avec une mine centrale
  [".*...\n...**\n***.*\n*..*.", "1*111\n122**\n***4*\n*22*2"], // Exemple complexe de vérification
])(`Given mine field %s should resolve as %s`, (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
