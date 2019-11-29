import moment from 'moment'

export function fahrenheitToCelsius(number: number): number {
  const result = (number - 32) * (5 / 9)
  return parseInt(result.toFixed(0), 10)
}

export function celsiusToFahrenheit(number: number): number {
  const result = (number * 9 / 5) + 32
  return parseInt(result.toFixed(0), 10)
}

export function formatDate(date: string): string {
  return moment(date).format('dddd')
}
