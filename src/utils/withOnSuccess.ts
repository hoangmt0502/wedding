import { FieldValues, SubmitHandler } from "react-hook-form";

export function withOnSuccess<T extends FieldValues>(
  submitFn: (data: T, onSuccess?: () => void) => void,
  onSuccess?: () => void
): SubmitHandler<T> {
  return (data) => submitFn(data, onSuccess);
}