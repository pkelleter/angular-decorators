/**
 * Memoize automatically caches values of a function call.
 * i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
 * running the function body again.
 * This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same
 * value for a given set of arguments)
 *
 * Note: @Memoize() is implemented on the class-layer, which means that caches will be shared among multiple instances of the same class
 */

export function Memoize(): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.__allCaches) {
      target.__allCaches = new Map<string, Map<string, unknown>>();
    }

    const originalFn = descriptor.value;
    descriptor.value = function(...args: unknown[]) {
      const cache = getCache(target, propertyKey);
      const cacheKey = JSON.stringify(args);
      if (!cache.has(cacheKey)) {
        cache.set(cacheKey, originalFn.apply(this, args));
      }
      return cache.get(cacheKey);
    };

    return descriptor;
  };
}

function getCache(target: any, propertyKey: string) {
  if (!target.__allCaches.has(propertyKey)) {
    target.__allCaches.set(propertyKey, new Map<string, unknown>());
  }
  return target.__allCaches.get(propertyKey);
}
