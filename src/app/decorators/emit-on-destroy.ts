import {ReplaySubject} from 'rxjs';
import {interposeAfterFunction, interposeBeforeFunction} from './helpers/decorator-helpers';

/**
 * EmitOnDestroy creates a subject which emits once and immediately completes after ngOnDestroy was called.
 * This can be used to easily implement the takeUntil() pattern for subscriptions which have to be canceled on a component's destroy hook.
 */

export function EmitOnDestroy() {
  return function(target: any, propertyKey: string) {
    interposeBeforeFunction(target, 'ngOnInit', function() {
      this[propertyKey] = new ReplaySubject<void>(1);
    });

    interposeAfterFunction(target, 'ngOnDestroy', function() {
      this[propertyKey].next();
      this[propertyKey].complete();
    });
  };

}
