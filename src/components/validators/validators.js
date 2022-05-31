export const required = (value) => (value ? undefined : "Required");

export const MaxLengthCreator = (maxLength) => (value) =>
  value?.length >= maxLength
    ? `Must be less than ${maxLength} symbols`
    : undefined;

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
