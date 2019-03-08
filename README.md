# Custom TypeScript Decorators for Angular

Several custom TypeScript Decorators for the Angular Framework, making the live of Angular developers easier.

## PropertyStream

<b>@PropertyStream(sourceKey?)</b><br>
Automatically creates a RxJS stream to a corresponding property,
i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.<br>
When the component is destroyed, the corresponding stream will complete.

<i>sourceKey</i><br>
The key of the property which should be streamed.<br> 
Defaults to the annotated property-key itself, while remove all <b>$</b> signs,
e.g. if you annotate the generated stream <b>myProperty$</b>, the corresponding property will default to <b>myProperty</b>.

## Memoize

<b>@Memoize(sharedCache?)</b><br>
Applies the concept of memoization to a given function, i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
running the function body again.<br>
This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same 
value for a given set of arguments)

<i>sharedCache</i><br>
By default the memoization cache will be shared amongst multiple instances of the same class.
If a new cache should be created for every instance of the given class instead, <b>sharedCache</b> should to be set to <b>false</b> instead

## EmitOnDestroy

<b>@EmitOnDestroy()</b><br>
Creates a subject which emits once and immediately completes after ngOnDestroy was called.
This can be used to easily implement the takeUntil() pattern for subscriptions which have to be canceled on a component's destroy hook.

For angular based frameworks that have their own lifecycle-hooks like e.g. ionic, hooks can be specified via configuration. Example:
```
@EmitOnDestroy({
    initialize: 'ionViewDidEnter',
    terminate: 'ionViewDidLeave'
})
```

## WebStorage

<b>@WebStorage(key?, type?)</b><br>
Ties the current value of the given property to the WebStorage of the browser.
This means values are read from and written to the WebStorage respectively.
That makes it super easy to share data among different tabs/sessions, etc.

All values are JSON encoded/decoded in order to support complex objects - however please keep in mind that not all modern types are
serializable (e.g. Maps, Sets).

<i>key</i><br>
They key to store the given value to in the corresponding WebStorage. Any key may be used, but keep in mind that name-collisions will
lead to the exact same property in the WebStorage which may cause problems if not handled properly.<br>
Defaults to the propertyKey itself, lead by the prefix __webStorage\_,
e.g. if you annotate the property <b>myProperty</b>, the corresponding WebStorage key will default to <b>__webStorage_myProperty</b>.

<i>type</i><br>
Supported types of WebStorage are <b>local</b> (localStorage) and <b>session</b> (sessionStorage). Defaults to <b>local</b>.
