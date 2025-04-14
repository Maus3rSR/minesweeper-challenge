import { expect, it } from "vitest";

function mineSweeperResolver(mineField: string): string {
  return mineField;
}

it.each([["*", "*"]])(
  "Given mine field %i should resolve as %i",
  (mineField, expectedResolve) => {
    expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
  }
);
