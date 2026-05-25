import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Launch Control Labs — Development Agency & AI Studio',
  description:
    "We build products that didn't exist yesterday. We fix the ones that stopped working today.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
