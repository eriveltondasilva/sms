import { twJoin } from 'tailwind-merge'

export const customTheme = {
  textarea: {
    colors: {
      gray: twJoin(
        'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500',
        'focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
        'dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
      ),
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          gray: twJoin(
            'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500',
            'focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
            'dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          ),
        },
      },
    },
  },
  tabs: {
    tablist: {
      tabitem: {
        base: twJoin(
          'flex items-center justify-center p-4',
          'rounded-t-lg text-sm font-medium first:ml-0',
          'disabled:cursor-not-allowed disabled:text-gray-400',
          'focus:outline-none disabled:dark:text-gray-500',
        ),
      },
    },
  },
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600',
    },
  },
}
