// @flow

export function fahrenheitToCelsius(number: number) {
  const result = (number - 32) * (5/9)
  return result.toFixed(0)
}

export function celsiusToFahrenheit(number: number) {
  const result = (number * 9/5) + 32
  return result.toFixed(0)
}
