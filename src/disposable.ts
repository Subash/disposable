export type AnyDisposable = {
  dispose: () => void;
};

export default class Disposable implements AnyDisposable {
  private disposed = false;
  private action: () => void;

  constructor(action: () => void) {
    this.action = action;
  }

  dispose() {
    if (this.disposed) return;

    this.disposed = true;
    this.action();
    this.action = null;
  }
}
