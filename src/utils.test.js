/* global expect */
import { decimal } from './utils';

it('should return 0.2', () => {
  expect(decimal(3.2)).toBe(0.2);
});

it('should return 0', () => {
  expect(decimal(3)).toBe(0);
});

it('should return 0', () => {
  expect(decimal(0)).toBe(0);
});

it('should return 0.344', () => {
  expect(decimal(4509.344)).toBe(0.344);
});
