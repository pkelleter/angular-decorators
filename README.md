# Custom TypeScript Decorators for Angular

Several custom TypeScript Decorators for the Angular Framework, making the live of Angular developers easier.

## PropertyStream

<b>@PropertyStream(sourceKey?)</b><br>
Automatically creates a RxJS stream to a corresponding property,
i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.<br>
When the component is destroyed, the corresponding stream will complete.

<i>sourceKey</i><br>
The key of the property which should be streamed.<br> 
Defaults to the annotated property-key itself, while remove all "$" signs,
e.g. if you annotate the generated stream "myProperty$", the corresponding property will default to "myProperty".

## Memoize

<b>@Memoize(sharedCache?)</b><br>
Applies the concept of memoization to a given function, i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
running the function body again.<br>
This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same 
value for a given set of arguments)

<i>sharedCache</i><br>
By default the memoization cache will be shared amongst multiple instances of the same class.
If a new cache should be created for every instance of the given class instead, "sharedCache" should to be set to "false" instead

## EmitOnDestroy

TBD
