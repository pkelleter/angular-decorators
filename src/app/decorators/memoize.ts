/**
 * Memoize automatically caches values of a function call.
 * i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
 * running the function body again.
 * This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same
 * value for a given set of arguments)
 */

export function Memoize(): MethodDecorator {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const knownResults = new Map<string, unknown>();
    descriptor.value = function(...args: unknown[]) {
      const cacheKey = JSON.stringify(args);
      if (knownResults.has(cacheKey)) {
        return knownResults.get(cacheKey);
      }
      const result = original.apply(this, args);
      knownResults.set(cacheKey, result);
      return result;
    };
    return descriptor;
  };
}
