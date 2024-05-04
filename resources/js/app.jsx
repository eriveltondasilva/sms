import '../sass/global.scss'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import 'flowbite'
import { Flowbite } from 'flowbite-react'
import { customTheme } from './flowbiteTheme'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <Flowbite theme={{ theme: customTheme }}>
        <App {...props} />
        <Toaster />
      </Flowbite>
    )
  },
  progress: {
    color: '#ff0000',
  },
})
