import Image from 'next/image'
import Sidebar from '@/components/layout/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-navy">
      <Sidebar />

      {/* Área de trabalho com onça watermark */}
      <div className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0 relative">
        {/* Onça watermark no fundo */}
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] pointer-events-none select-none z-0 opacity-[0.04]">
          <Image
            src="/onca-transparent.png"
            alt=""
            width={520}
            height={520}
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Conteúdo acima do watermark */}
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
