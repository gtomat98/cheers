export function shouldIncreaseOrDecreaseCalories(
  height: number,
  weight: number,
) {
  const bodyMassIndex = weight / ((height / 100) * (height / 100))

  if (bodyMassIndex > 18.5 && bodyMassIndex < 25) {
    return 0
  } else if (bodyMassIndex < 18.5) {
    return -1
  }
  return 1
}
