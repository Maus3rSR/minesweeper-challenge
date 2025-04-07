import { expect, it } from "vitest";

/**
 * Mine field should resolve as:
 *      *      resolve as    *
 */
function mineSweeperResolver(mineField: string): string {
  return "*";
}

it.each([["*", "*"]])(
  "Given mine field %i should resolve as %i",
  (mineField, expectedResolve) => {
    expect(mineSweeperResolver(mineField)).toBe(expectedResolve);
  }
);
