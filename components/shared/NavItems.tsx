'use client';

import { headerLinks } from '@/constants'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li key={link.route} className={`${isActive ? 'text-primary-500' : ''} p-medium-14 whitespace-nowrap hover:underline underline-offset-4`}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems