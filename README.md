# Custom TypeScript Decorators for Angular

In this Project I am playing around with custom TypeScript Decorators for the Angular Framework. My goal is to create some (hopefully) generally useful decorators which can help everyone to remove some boilerplate code from their Angular projects.

## PropertyStream

<b>@PropertyStream(sourceKey?, propertySubject?)</b><br>
automatically creates a RxJS stream to a corresponding property,
i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.

<i>sourceKey</i><br>
The key of the property which should be streamed. Defaults to the annotated property-key, but removing all "$" signs.
e.g. if you annotate a property with the key "foo$", the streamed property will default to "foo"

<i>propertySubject</i><br>
The subject which is used to stream the corresponding property. Defaults to a ReplaySubject with buffer-size 1.


## Memoize

<b>@Memoize()</b><br>
easily applies the concept of memoization to a given function.

i.e. whenever a function is called with the same arguments more than once, the cached result will be returned immediately instead of
running the function body again.
This approach is called memoization and naturally should only be applied to pure functions (no side-effects, always returns the same 
value for a given set of arguments)
