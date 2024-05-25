import React, { Component } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Anybody } from 'next/font/google'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <Link href="/" className="w-36">
            <Image src="/assets/images/logo_nome_f.svg" width={108} height={36} alt="eventum" />
            </Link>
            <SignedIn>
              <nav className="md:flex-between hidden w-full ">
                <NavItems>

                </NavItems>
              </nav>
            </SignedIn>
            <div className="flex w-32 justify-end gap-2">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <MobileNav />
              </SignedIn>
              <SignedOut>
                <Button asChild className="rounder-full" size="lg">
                  <Link href="/sign-in">
                    Login
                  </Link>
                </Button>
              </SignedOut>

            </div>
        </div>
    </header>

  )
}

export default Header