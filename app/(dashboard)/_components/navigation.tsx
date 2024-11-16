import React from 'react';
import { routes } from '../_constants/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Navigation = () => {
    return (
        <ul className='flex flex-col'>
            {
                routes.map((item) => {
                    const isActive = false;
                    const Icon = isActive ? item.activeIcon : item.icon;
                    return (
                        <Link href={item.href} key={item.href}>
                            <div className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                                 isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className='size-5 text-neutral-500'/>
                                {item.label}
                            </div>
                        </Link>
                    )
                })
            }
        </ul>
    );
};

export default Navigation;