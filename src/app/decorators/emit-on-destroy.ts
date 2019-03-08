import {ReplaySubject} from 'rxjs';
import {interposeAfterFunction, interposeBeforeFunction} from './helpers/decorator-helpers';
import {EmitOnDestroyConfig} from './interfaces/emit-on-destroy-config';
/**
 * EmitOnDestroy creates a subject which emits once and immediately completes after ngOnDestroy was called.
 * This can be used to easily implement the takeUntil() pattern for subscriptions which have to be canceled on a component's destroy hook.
 * 
 * For angular based frameworks that have their own lifecycle-hooks like e.g. ionic, hooks can be specified via configuration.
 * Example Usage:
 * @EmitOnDestroy({
 *  initialize: 'ionViewDidEnter',
 *  terminate: 'ionViewDidLeave'
 * })
 * 
 */

const defaultConfig: EmitOnDestroyConfig = {
  initialize: 'ngOnInit',
  terminate: 'ngOnDestroy'
};

export function EmitOnDestroy(config: EmitOnDestroyConfig = defaultConfig) {
  return function(target: any, propertyKey: string) {
    interposeBeforeFunction(target, config.initialize, function() {
      this[propertyKey] = new ReplaySubject<void>(1);
    });

    interposeAfterFunction(target, config.terminate, function() {
      this[propertyKey].next();
      this[propertyKey].complete();
    });
  };

}
