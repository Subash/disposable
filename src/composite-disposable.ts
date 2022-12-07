import type { AnyDisposable } from "./disposable";

export default class CompositeDisposable implements AnyDisposable {
  private disposed = false;
  private disposables = new Set<AnyDisposable>();

  constructor(...disposables: AnyDisposable[]) {
    for (let disposable of disposables) {
      this.add(disposable);
    }
  }

  add(...disposables: AnyDisposable[]): void {
    if (this.disposed) return;

    for (const disposable of disposables) {
      this.disposables.add(disposable);
    }
  }

  remove(...disposables: AnyDisposable[]): void {
    if (this.disposed) return;

    for (const disposable of disposables) {
      this.disposables.delete(disposable);
    }
  }

  dispose(): void {
    if (this.disposed) return;

    this.disposed = true;
    this.disposables.forEach((disposable) => disposable.dispose());
    this.disposables.clear();
  }
}
