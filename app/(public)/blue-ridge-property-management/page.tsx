import { Metadata } from 'next'
import { Suspense } from 'react'
import PageLoading from '@/components/ui/PageLoading'
import PropertyManagementContent from '@/components/property-management/PropertyManagementContent'

export const metadata: Metadata = {
  title: 'Blue Ridge Property Management | Cabin Rentals of Georgia',
  description: 'Full-service Blue Ridge, GA cabin property management. Family owned and operated since 2003. Contact us to see how you can earn more with our vacation rental property mgmt. 24/7 support.',
  keywords: 'Blue ridge property management, blue ridge cabin property management, vacation rental property management, vacation rental property mgmt, blue ridge rental management, blue ridge cabin rental mgmt, blue ridge ga property management, property management in blue ridge, owning a vacation rental in blue ridge ga, investment property in blue ridge ga, North Georgia property management, blue ridge rental properties, North Georgia cabin rental income, blue ridge cabin rental income, blue ridge ga cabin rental income, cabin management blue ridge ga, cabin management north ga',
}

export default async function BlueRidgePropertyManagementPage() {
  return (
    <Suspense fallback={<PageLoading message="Loading property management information..." variant="cabin" />}>
      <PropertyManagementContent />
    </Suspense>
  )
}

