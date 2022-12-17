import { average } from "../../../utils/math";

export function calculateAverage(array: (string | number)[]) {
  return average(Number(array[1]), Number(array[2]));
}

export function sortByAverage(a: (string | number)[], b: (string | number)[]) {
  const averageA = calculateAverage(a);
  const averageB = calculateAverage(b);
  if (averageA > averageB) {
    return -1;
  }

  if (averageA < averageB) {
    return 1;
  }

  return 0;
}
