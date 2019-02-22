import {ReplaySubject} from 'rxjs';

/**
 * PropertyStream automatically creates a RxJS stream to a corresponding property.
 * i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.
 * When the component is destroyed, the corresponding stream will complete.
 *
 * @param sourceKey
 * The key of the property which should be streamed. Defaults to the annotated property-key itself, while remove all "$" signs,
 * e.g. if you annotate the generated stream "myProperty$", the corresponding property will default to "myProperty".
 */

export function PropertyStream(sourceKey?: string) {

  return function(target: any, propertyKey: string) {

    const originalDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function() {
      getSubject(this).complete();
      if (typeof originalDestroy === 'function') {
        originalDestroy.apply(this);
      }
    };

    Object.defineProperty(target, getSourceKey(), {
      get() {
        return this[`__${getSourceKey()}Value`];
      },
      set(value) {
        this[`__${getSourceKey()}Value`] = value;
        getSubject(this).next(value);
      }
    });

    Object.defineProperty(target, propertyKey, {
      get() {
        return getSubject(this).asObservable();
      }
    });

    function getSubject(instance: object) {
      const subjectKey = `__${getSourceKey()}Subject`;
      if (!instance[subjectKey]) {
        instance[subjectKey] = new ReplaySubject<void>(1);
      }
      return instance[subjectKey];
    }

    function getSourceKey() {
      if (sourceKey) {
        return sourceKey;
      }
      const derivedSourceKey = propertyKey.replace(/\$/g, '');
      if (propertyKey === derivedSourceKey) {
        throw  new Error('No source-key provided for PropertyStream decorator. ' +
          'Source-key could not be derived, since the annotated property-key does not contain a "$" sign.');
      }
      return derivedSourceKey;
    }

  };

}
