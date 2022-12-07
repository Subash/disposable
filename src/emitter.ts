import Disposable from "./disposable";

type Callback = (...args: any[]) => void;

export default class Emitter<Events extends Record<string, Callback>> {
  private disposed = false;
  private callbacksByEventName: Record<string, Set<Callback>> = {};

  on<Event extends string & keyof Events>(
    event: Event,
    callback: Events[Event]
  ): Disposable {
    const callbacks = this.callbacksByEventName[event] || new Set<Callback>();
    this.callbacksByEventName[event] = callbacks;
    callbacks.add(callback);

    return new Disposable(() => {
      callbacks.delete(callback);
    });
  }

  once<Event extends string & keyof Events>(
    event: Event,
    callback: Events[Event]
  ): Disposable {
    let disposable: Disposable;

    const wrappedCallback = (...args: Parameters<Events[Event]>) => {
      disposable.dispose();
      callback(...args);
    };

    return (disposable = this.on(event, wrappedCallback as Events[Event]));
  }

  emit<Event extends string & keyof Events>(
    event: Event,
    ...args: Parameters<Events[Event]>
  ) {
    if (this.disposed) return;

    const callbacks = this.callbacksByEventName[event];

    // copy callbacks to ignore any mutations occurred during an emit
    const _callbacks = Array.from(callbacks ?? []);

    for (const callback of _callbacks) {
      callback(...args);
    }
  }

  dispose() {
    this.disposed = true;
    this.callbacksByEventName = {};
  }
}
