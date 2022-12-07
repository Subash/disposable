import { describe, expect, jest, test } from "@jest/globals";
import Disposable from "../src/disposable";

describe("Test Disposable", () => {
  test("test dispose()", () => {
    const callback = jest.fn();
    const disposable = new Disposable(callback);
    disposable.dispose();
    disposable.dispose(); // this should be ignored
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
