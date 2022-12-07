import { describe, expect, jest, test } from "@jest/globals";
import CompositeDisposable from "../src/composite-disposable";
import Disposable from "../src/disposable";

describe("Test CompositeDisposable", () => {
  test("test dispose()", () => {
    const callback = jest.fn();
    const d1 = new Disposable(callback);
    const d2 = new Disposable(callback);
    const d3 = new Disposable(callback);
    const d4 = new Disposable(callback);

    const cd = new CompositeDisposable(d1, d2);

    cd.add(d3, d4);
    cd.remove(d4);
    cd.dispose();

    cd.add(d3, d4); // should be ignored
    cd.remove(d4); // should be ignored
    cd.dispose(); // should be ignored

    expect(callback).toHaveBeenCalledTimes(3);
  });
});
