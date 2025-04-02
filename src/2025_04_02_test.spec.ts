import { describe, expect, it } from "vitest";

/**
 * Scenario 1 : Mine field with 0 mine must resolve field with 0
 *
 * Given a mine field with 0 mines
 * ......
 * ......
 * ......
 *
 * When I solve the mine field
 *
 * Then I receive the following resolve
 *
 * 000000
 * 000000
 * 000000
 */

function mineSweeperResolver(mineField: string): string {
  return mineField.replaceAll(".", "0");
}

it("Given a mine field with 0 mines", () => {
  const mineField = `......\n......\n......`;

  const resolvedMineField = mineSweeperResolver(mineField);
  expect(resolvedMineField).toBe(`000000\n000000\n000000`);
});

/**
 * Scenario 2 : Mine field with * mine must resolve field with *
 *
 * Given a mine field full of mines
 * ******
 * ******
 * ******
 *
 * When I solve the mine field
 *
 * Then I receive the following resolve
 *
 * ******
 * ******
 * ******
 */

it("Given a mine field full of mines", () => {
  const mineField = `******\n******\n******`;

  const resolvedMineField = mineSweeperResolver(mineField);
  expect(resolvedMineField).toBe(`******\n******\n******`);
});
