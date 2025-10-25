interface OptionalApi<T> {
  get(): T
  isEmpty: boolean;
}

interface Empty<T> extends OptionalApi<T> {
  readonly type: 'Empty'
}

interface Valid<T> extends OptionalApi<T> {
  readonly type: 'Valid'
}

type Optional<T> = Empty<T> | Valid<T>

function optionalOf<T>(value: T|undefined|null): Optional<T> {
  return value != null
    ? {
      type: 'Valid',
      isEmpty: false,
      get() {
        return value
      }
    } as Valid<T>
    : {
      type: 'Empty',
      isEmpty: true,
      get() {
        throw new Error('Cannot get from Empty optional')
      }
    } as Empty<T>
}

