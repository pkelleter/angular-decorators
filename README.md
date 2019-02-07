# Custom TypeScript Decorators for Angular

In this Project I am playing around with custom TypeScript Decorators for the Angular Framework. My goal is to create some (hopefully) generally useful decorators which can help everyone to remove some boilerplate code from their Angular projects.

## PropertyStream

PropertyStream automatically creates a RxJS stream to a corresponding property,
i.e. whenever the corresponding property gets updated, the newly created stream will emit accordingly.

@param sourceKey
The key of the property which should be streamed. Defaults to the annotated property-key, but removing all "$" signs.
e.g. if you annotate a property with the key "foo$", the streamed property will default to "foo"

@param propertySubject
The subject which is used to stream the corresponding property. Defaults to a ReplaySubject with buffer-size 1.
