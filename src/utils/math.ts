import { Position } from '@/types/Position';

export const getDistance = (element1: Position, element2: Position): number => {
  const sideA = Math.abs(element2.x - element1.x);
  const sideB = Math.abs(element2.y - element1.y);

  return Math.sqrt(sideA ** 2 + sideB ** 2);
};
