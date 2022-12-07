import { describe, expect, jest, test } from "@jest/globals";
import Emitter from "../src/emitter";

type Events = {
  click: (button: number) => void;
  input: (value: string) => void;
};

describe("Test Emitter", () => {
  test("test on()", () => {
    const callback = jest.fn();
    const emitter = new Emitter<Events>();
    const subscription = emitter.on("click", callback);
    emitter.emit("click", 2);
    subscription.dispose();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });

  test("test once()", () => {
    const callback = jest.fn();
    const emitter = new Emitter<Events>();
    emitter.once("click", callback);
    emitter.emit("click", 2);
    emitter.emit("click", 2);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });

  test("test emit()", () => {
    const callback = jest.fn();
    const emitter = new Emitter<Events>();
    emitter.once("click", callback);
    emitter.emit("click", 2);
    emitter.emit("input", "subash");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });

  test("test mutation during emit()", () => {
    const emitter = new Emitter<Events>();

    const c1 = jest.fn();
    const d1 = emitter.on("click", c1);

    const c2 = () => d1.dispose();
    emitter.on("click", c2);

    emitter.emit("click", 1);
    emitter.emit("click", 1);

    // should be called on the first emit
    // and be disposed by c2 to be ignored on second emit
    expect(c1).toHaveBeenCalledTimes(1);
  });

  test("test dispose()", () => {
    const callback = jest.fn();
    const emitter = new Emitter<Events>();
    emitter.on("click", callback);
    emitter.emit("click", 2);
    emitter.emit("click", 2);
    emitter.dispose();
    emitter.emit("click", 2); // this should be ignored
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
