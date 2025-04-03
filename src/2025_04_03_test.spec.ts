import { expect, it } from "vitest";

/**
 * Mine field should resolve as:
 *
 *      *      resolve as    *
 *      .      resolve as    0
 *      ..     resolve as    00
 *      .*     resolve as    1*
 *      *.     resolve as    *1
 *      **     resolve as    **
 *      .*.    resolve as    1*1
 */
