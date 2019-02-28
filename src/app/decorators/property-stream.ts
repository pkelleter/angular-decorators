import {ReplaySubject} from 'rxjs';
import {interposeAfterFunction, interposeBeforeFunction} from './helpers/decorator-helpers';

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
    interposeBeforeFunction(target, 'ngOnInit', function() {
      getSubject(this, propertyKey, sourceKey);
    });

    interposeAfterFunction(target, 'ngOnDestroy', function() {
      getSubject(this, propertyKey, sourceKey).complete();
    });

    Object.defineProperty(target, getDerivedSourceKey(propertyKey, sourceKey), {
      get() {
        return this[getValueKey(propertyKey, sourceKey)];
      },
      set(value) {
        this[getValueKey(propertyKey, sourceKey)] = value;
        getSubject(this, propertyKey, sourceKey).next(value);
      }
    });

    Object.defineProperty(target, propertyKey, {
      get() {
        return getSubject(this, propertyKey, sourceKey).asObservable();
      }
    });
  };
}

function getSubject(instance: object, propertyKey: string, sourceKey: string) {
  const derivedSourceKey = getDerivedSourceKey(propertyKey, sourceKey);
  const subjectKey = `__${derivedSourceKey}Subject`;
  if (!instance[subjectKey]) {
    instance[subjectKey] = new ReplaySubject<unknown>(1);
  }
  return instance[subjectKey];
}

function getDerivedSourceKey(propertyKey: string, sourceKey: string) {
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

function getValueKey(propertyKey: string, sourceKey: string) {
  const derivedSourceKey = getDerivedSourceKey(propertyKey, sourceKey);
  return `__${derivedSourceKey}Value`;
}
