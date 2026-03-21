import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agência Kolhey',
  description: 'Painel de gestão da Agência Kolhey — Resultados que se cultivam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
