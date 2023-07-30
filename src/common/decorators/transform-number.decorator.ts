import { Transform } from 'class-transformer';

export function TransformNumber() {
  return Transform(({ value }) =>
    typeof value === 'number' ? value : Number(value),
  );
}
