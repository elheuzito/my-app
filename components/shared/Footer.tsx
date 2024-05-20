import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row text-xs">
        <Link href="/">
          <Image src="/assets/images/logo.svg" width={24} height={24} alt="eventum" />
        </Link>
        <p>2024 Eventum. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer