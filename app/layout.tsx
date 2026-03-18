import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Esteira de Produção | Agência',
  description: 'Gestão da esteira de produção da agência de marketing',
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
