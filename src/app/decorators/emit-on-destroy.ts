import {ReplaySubject} from 'rxjs';

// TODO:
// - implement this in general
// - make sure to re-create this on every init

export function EmitOnDestroy() {
  return function(target: any, propertyKey: string) {
    const originalInit = target.ngOnInit;
    target.ngOnInit = function() {
      target.__destroySubject = new ReplaySubject<void>(1);
      if (typeof originalInit === 'function') {
        originalInit();
      }
    };

    const originalDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function() {
      target.__destroySubject.next();
      target.__destroySubject.complete();
      if (typeof originalDestroy === 'function') {
        originalDestroy();
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: () => target.__allCaches.asObservable(),
      set: () => void 0
    });

  };

}
