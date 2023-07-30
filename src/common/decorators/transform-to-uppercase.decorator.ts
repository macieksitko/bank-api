import { Transform } from 'class-transformer';

export function TransformToUppercase() {
  return Transform(({ value }) => String(value).toLocaleUpperCase());
}
