export const DEFAULT_VARIANTS = [
  'font-semibold uppercase tracking-widest',
  'inline-flex items-center justify-center',
  'rounded-md border border-transparent',
  'transition duration-150 ease-in-out',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
]

export const COLOR_VARIANTS = {
  primary: [
    'text-white focus:ring-indigo-500',
    'bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900',
    'dark:bg-gray-200 dark:hover:bg-white dark:focus:bg-white dark:active:bg-gray-300',
    'dark:text-gray-800 dark:focus:ring-offset-gray-800',
  ],
  secondary: [
    'bg-white hover:bg-gray-50',
    'text-gray-700 focus:ring-indigo-500 border-gray-300 shadow-sm',
    'dark:bg-gray-800 dark:hover:bg-gray-700',
    'dark:border-gray-500 dark:text-gray-300 dark:focus:ring-offset-gray-800',
  ],
  danger: [
    'text-white focus:ring-red-500',
    'bg-red-600 hover:bg-red-500 active:bg-red-700',
    'dark:focus:ring-offset-gray-800',
  ],
}

export const SIZE_VARIANTS = {
  sm: 'px-2 py-1.5 text-xs',
  base: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2 text-base',
  xl: 'px-6 py-2 text-lg',
}
