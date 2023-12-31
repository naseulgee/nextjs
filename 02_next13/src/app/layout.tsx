import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aa = "/aa";
  const bb = "/bb";
  return (
    <html lang="en">
      <body className={inter.className}>
        루트 레이아웃<br/>
        <nav>
          <Link href="/">HOME</Link><br/>
          <Link href="/blog">Blog</Link><br/>
          <Link href="/about">About</Link><br/>
          <Link href={"/dynamic/" + aa}>DynamicA</Link><br/>
          <Link href={"/dynamic/" + bb}>DynamicB</Link><br/>
        </nav>
        {children}
      </body>
    </html>
  )
}
