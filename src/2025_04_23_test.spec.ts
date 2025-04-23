import { expect, it } from "vitest";

type ResolveMineCaseProps = {
  mineValueToResolve: string;
  caseAtLeft: string | undefined;
  caseAtRight: string | undefined;
  caseAtBottom: string | undefined;
  caseAtTop: string | undefined;
  caseAtTopLeft: string | undefined;
  caseAtTopRight: string | undefined;
  caseAtBottomLeft: string | undefined;
  caseAtBottomRight: string | undefined;
};

function isABomb(char: string | undefined) {
  return char === "*";
}

function resolveMineCase({
  mineValueToResolve,
  caseAtLeft,
  caseAtRight,
  caseAtBottom,
  caseAtTop,
  caseAtTopLeft,
  caseAtTopRight,
  caseAtBottomLeft,
  caseAtBottomRight,
}: ResolveMineCaseProps) {
  if (mineValueToResolve === "*") return mineValueToResolve;

  const aroundValues = [
    caseAtLeft,
    caseAtRight,
    caseAtBottom,
    caseAtTop,
    caseAtTopLeft,
    caseAtTopRight,
    caseAtBottomLeft,
    caseAtBottomRight,
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
        caseAtLeft: lines[lineNumber][i - 1],
        caseAtRight: lines[lineNumber][i + 1],
        caseAtBottom: lines[lineNumber + 1] && lines[lineNumber + 1][i],
        caseAtTop: lines[lineNumber - 1] && lines[lineNumber - 1][i],
        caseAtTopLeft: lines[lineNumber - 1] && lines[lineNumber - 1][i - 1],
        caseAtTopRight: lines[lineNumber - 1] && lines[lineNumber - 1][i + 1],
        caseAtBottomLeft: lines[lineNumber + 1] && lines[lineNumber + 1][i - 1],
        caseAtBottomRight:
          lines[lineNumber + 1] && lines[lineNumber + 1][i + 1],
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
  ["*.\n..", "*1\n11"], // Une mine en diagonale haute-gauche
  [".*\n..", "1*\n11"], // Une mine en diagonale haute-droite
  ["..\n*.", "11\n*1"], // Une mine en diagonale bas-gauche
  ["..\n.*", "11\n1*"], // Une mine en diagonale bas-droite
  ["*.\n*.", "*2\n*2"], // Deux lignes avec une mine à gauche
  [".*\n.*", "2*\n2*"], // Deux lignes avec une mine à droite
  ["*.\n.*", "*2\n2*"], // Une ligne avec une mine à gauche et une ligne avec une mine à droite
  ["*.*\n*.*", "*4*\n*4*"], // Deux lignes avec une mine à chaque extrémité
  ["...\n.*.\n...", "111\n1*1\n111"], // Trois lignes avec une mine centrale
  [".*...\n...**\n***.*\n*..*.", "1*222\n344**\n***5*\n*43*2"], // Exemple complexe de vérification
])(`Given mine field %s should resolve as %s`, (mineField, expectedResolve) => {
  expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
});
