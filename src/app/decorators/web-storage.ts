// import {ReplaySubject} from 'rxjs';
//
// /**
//  * WebStorage
//  *
//  * @param mode
//  */
//
// export function WebStorage(mode: ('local' | 'session') = 'local') {
//
//   return function(target: any, propertyKey: string) {
//
//     Object.defineProperty(target, propertyKey, {
//       get() {
//         return this[`__${getSourceKey()}Value`];
//       },
//       set(value) {
//         this[`__${getSourceKey()}Value`] = value;
//         getSubject(this).next(value);
//       }
//     });
//
//     Object.defineProperty(target, propertyKey, {
//       get() {
//         return getSubject(this).asObservable();
//       }
//     });
//
//   };
//
// }
