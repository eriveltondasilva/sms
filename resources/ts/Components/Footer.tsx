import { Footer as FlowbiteFooter } from 'flowbite-react'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, link: '#' },
  { icon: Instagram, link: '#' },
  { icon: Youtube, link: '#' },
]

function FooterRoot({ children }: React.PropsWithChildren) {
  return (
    <FlowbiteFooter className='shadow-md' container>
      {children}
    </FlowbiteFooter>
  )
}

function FooterRight() {
  return (
    <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
      {/* Redes sociais */}
      {socialLinks?.map(({ icon, link }, index) => (
        <FlowbiteFooter.Icon
          key={`footer-social-${index}`}
          href={link}
          icon={icon}
        />
      ))}
    </div>
  )
}

function FooterLeft() {
  const year = new Date().getFullYear()

  return (
    <FlowbiteFooter.Copyright
      href='https://www.instagram.com/erivelton.dsilva/'
      by='by Erivelton'
      year={year}
    />
  )
}

export const Footer = Object.assign(FooterRoot, {
  Left: FooterLeft,
  Right: FooterRight,
})
