import {ReplaySubject} from 'rxjs';

/**
 * PropertyStream automatically creates a RxJS stream to a corresponding property.
 * i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.
 *
 * @param sourceKey
 * The key of the property which should be streamed. Defaults to the annotated property-key, but removing all "$" signs.
 * e.g. if you annotate a property with the key "foo$", the streamed property will default to "foo"
 *
 * @param propertySubject
 * The subject which is used to stream the corresponding property. Defaults to a ReplaySubject with buffer-size 1.
 */
export function PropertyStream(sourceKey?: string, propertySubject = new ReplaySubject<unknown>(1)) {

  return function(target: object, propertyKey: string) {
    const propertyObservable = propertySubject.asObservable();
    let propertyValue: unknown;

    if (!sourceKey) {
      const derivedSourceKey = propertyKey.replace(/\$/g, '');
      if (propertyKey === derivedSourceKey) {
        throw  new Error(
          'No source-key provided for PropertyStream decorator. ' +
          'Source-key could not be derived, since the annotated property-key does not contain a "$" sign.'
        );
      }
      sourceKey = derivedSourceKey;
    }

    Object.defineProperty(target, sourceKey, {
      get: () => propertyValue,
      set: (value) => {
        propertyValue = value;
        propertySubject.next(value);
      }
    });

    Object.defineProperty(target, propertyKey, {
      get: () => propertyObservable,
      set: () => void 0
    });
  };

}
