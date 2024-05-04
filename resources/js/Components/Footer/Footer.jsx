import { Footer } from 'flowbite-react'
import { socialLinks } from './data'

// ====================================
export function FooterRoot({ children }) {
  return (
    <Footer className='shadow-md' container>
      {children}
    </Footer>
  )
}

// ====================================
export function FooterRight() {
  return (
    <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
      {/* Redes sociais */}
      {socialLinks?.map(({ icon, link }, index) => (
        <Footer.Icon key={`footer-social-${index}`} href={link} icon={icon} />
      ))}
    </div>
  )
}

// ====================================
export function FooterLeft() {
  const year = new Date().getFullYear()

  return (
    <Footer.Copyright
      href='https://www.instagram.com/erivelton.dsilva/'
      by='by Erivelton'
      year={year}
    />
  )
}
