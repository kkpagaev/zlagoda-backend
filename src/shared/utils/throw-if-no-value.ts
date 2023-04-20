export const throwIfNoValue =
  (errorFactory: () => Error) =>
  <T>(value: T | undefined | null): T => {
    if (value === undefined || value === null) {
      throw errorFactory()
    }

    return value
  }
