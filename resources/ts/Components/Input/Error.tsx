export function Error({ text }: { text: string }) {
  return <p className='text-sm text-red-600 dark:text-red-400'>{text}</p>
}
