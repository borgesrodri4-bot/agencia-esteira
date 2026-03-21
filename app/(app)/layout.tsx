import Sidebar from '@/components/layout/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-navy">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        {children}
      </div>
    </div>
  )
}
