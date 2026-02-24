import { clsx } from 'clsx/lite'

interface HeadingProps {
  title: string
  description?: string
  variant?: 'default' | 'small'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function Heading({
  title,
  description,
  variant = 'default',
  as = 'h2',
}: HeadingProps) {
  const Comp = as
  const isSmall = variant === 'small'

  return (
    <header className={clsx(isSmall && 'mb-8 space-y-0.5')}>
      <Comp
        className={
          isSmall ?
            'mb-0.5 text-base font-medium'
          : 'text-xl font-semibold tracking-tight'
        }
      >
        {title}
      </Comp>
      {description && (
        <p className='text-sm text-muted-foreground'>{description}</p>
      )}
    </header>
  )
}
