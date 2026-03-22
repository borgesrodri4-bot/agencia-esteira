import Image from 'next/image'
import Sidebar from '@/components/layout/Sidebar'
import PageTransition from '@/components/layout/PageTransition'
import { Toaster } from 'sonner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-navy">
      <Sidebar />

      {/* Área de trabalho com onça watermark */}
      <div className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0 relative">
        {/* Onça watermark no fundo */}
        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] sm:w-[520px] sm:h-[520px] pointer-events-none select-none z-0 opacity-[0.04]">
          <Image
            src="/onca-transparent.png"
            alt=""
            width={280}
            height={280}
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Conteúdo acima do watermark com page transitions */}
        <PageTransition>
          {children}
        </PageTransition>
      </div>

      {/* Toast notifications */}
      <Toaster
        theme="dark"
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            background: '#235475',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}
