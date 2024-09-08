import dayjs from 'dayjs'

export function formatDate(
  dateString: string = '',
  format: string = 'L',
): string {
  return dayjs(dateString).format(format)
}
