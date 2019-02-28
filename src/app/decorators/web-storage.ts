import {isEqual} from 'lodash-es';

/**
 * WebStorage ties the current value of the given property to the WebStorage of the browser.
 * This means values are read from and written to the WebStorage respectively.
 * That makes it super easy to share data among different tabs/sessions, etc.
 *
 * All values are JSON encoded/decoded in order to support complex objects - however please keep in mind that not all modern types are
 * serializable (e.g. Maps, Sets).
 *
 * @param key
 * They key to store the given value to in the corresponding WebStorage. Any key may be used, but keep in mind that name-collisions will
 * lead to the exact same property in the WebStorage which may cause problems if not handled properly.
 * Defaults to the propertyKey itself, lead by the prefix "__webStorage_".
 * e.g. if you annotate the property "myProperty", the corresponding WebStorage key will default to "__webStorage_myProperty".
 *
 * @param type
 * Supported types of WebStorage are "local" (localStorage) and "session "(sessionStorage). Defaults to "local".
 */

const initializedValues = new Set<string>();
const objectReferenceCache = new Map<string, unknown>();

type WebStorageType = 'local' | 'session';

export function WebStorage(key?: string, type: WebStorageType = 'local') {

  return function(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        const storage = (type === 'local') ? localStorage : sessionStorage;
        key = key || `__webStorage_${propertyKey}`;
        let value: unknown;
        try {
          value = JSON.parse(storage.getItem(key));
          if (!isEqual(value, objectReferenceCache.get(key))) {
            objectReferenceCache.set(key, value);
          }
          return objectReferenceCache.get(key);
        } catch (e) {
          console.warn(`error while reading value from WebStorage with key ${key}`);
        }
        return value;
      },
      set(value) {
        const storage = (type === 'local') ? localStorage : sessionStorage;
        key = key || `__webStorage_${propertyKey}`;
        try {
          if (!initializedValues.has(key)) {
            initializedValues.add(key);
            if (storage.getItem(key)) {
              return;
            }
          }
          storage.setItem(key, JSON.stringify(value));
        } catch (e) {
          console.warn(`error while writing value to WebStorage with key ${key}`);
        }
      }
    });
  };

}
