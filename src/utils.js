// @flow

export function fahrenheitToCelsius(number: number): number {
  const result = (number - 32) * (5/9)
  return parseInt(result.toFixed(0))
}

export function celsiusToFahrenheit(number: number): number {
  const result = (number * 9/5) + 32
  return parseInt(result.toFixed(0))
}
