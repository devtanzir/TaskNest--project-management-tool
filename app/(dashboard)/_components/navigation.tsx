"use client"
import React from 'react';
import { routes } from '../_constants/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId"
import { usePathname } from "next/navigation"

const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();
    return (
        <ul className='flex flex-col'>
            {
                routes.map((item) => {
                    const fullHref = `/workspaces/${workspaceId}${item.href}`
                    const isActive = pathname === fullHref;;
                    const Icon = isActive ? item.activeIcon : item.icon;
                    return (
                        <Link href={fullHref} key={item.href}>
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