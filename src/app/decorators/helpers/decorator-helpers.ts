export function interposeBeforeFunction(context: object, property: string, fn: () => void) {
  interposeFunction(context, property, fn);
}

export function interposeAfterFunction(context: object, property: string, fn: () => void) {
  interposeFunction(context, property, undefined, fn);
}

export function interposeFunction(context: object, property: string,
                                  before?: () => void,
                                  after?: () => void) {
  const original = context[property];
  context[property] = function() {
    if (typeof before === 'function') {
      before.apply(this);
    }
    if (typeof original === 'function') {
      original.apply(this);
    }
    if (typeof after === 'function') {
      after.apply(this);
    }
  };
}
