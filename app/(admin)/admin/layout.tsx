import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Cabin Rentals of Georgia',
  description: 'Admin panel for managing Cabin Rentals of Georgia',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

