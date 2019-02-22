/**
 * Memoize automatically caches values of a function call.
 * i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
 * running the function body again.
 * This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same
 * value for a given set of arguments)
 *
 * @param sharedCache
 * By default the memoization cache will be shared amongst multiple instances of the same class.
 * If a new cache should be created for every instance of the given class instead, "sharedCache" should to be set to "false" instead
 */

const cacheMapKey = '__memoizeCacheMap';

export function Memoize(sharedCache = true): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;
    descriptor.value = function(...args: unknown[]) {
      const cacheHolder = sharedCache ? target : this;
      const cache = getCache(cacheHolder, propertyKey);
      const cacheKey = JSON.stringify(args);
      if (!cache.has(cacheKey)) {
        cache.set(cacheKey, originalFn.apply(this, args));
      }
      return cache.get(cacheKey);
    };
    return descriptor;
  };
}

function getCache(instance: object, propertyKey: string) {
  if (!instance[cacheMapKey]) {
    instance[cacheMapKey] = new Map<string, Map<string, unknown>>();
  }
  if (!instance[cacheMapKey].has(propertyKey)) {
    instance[cacheMapKey].set(propertyKey, new Map<string, unknown>());
  }
  return instance[cacheMapKey].get(propertyKey);
}
