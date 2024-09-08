import '../sass/global.scss'
import './bootstrap'
import './dayjs'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

import { Flowbite } from 'flowbite-react'
import { Toaster } from 'react-hot-toast'
import { customTheme } from './flowbiteTheme'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(
      <StrictMode>
        <Flowbite theme={{ theme: customTheme }}>
          <App {...props} />
          <Toaster />
        </Flowbite>
      </StrictMode>,
    )
  },
  progress: {
    color: '#ff0000',
  },
})
