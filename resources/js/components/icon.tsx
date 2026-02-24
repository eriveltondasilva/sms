import { cn } from '@/lib/utils';

import type { LucideIcon, LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
    iconNode: LucideIcon;
    label?: string;
}

export function Icon({ iconNode: IconComponent, className, label, ...props }: IconProps) {
    return (
        <>
            <IconComponent className={cn('size-4', className)} {...props} />
            {label && <span className='sr-only'>{label}</span>}
        </>
    )
}
