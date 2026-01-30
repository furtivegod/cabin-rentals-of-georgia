import Link from 'next/link'
import Image from 'next/image'

// This would come from your API in a real implementation
const mockCabins = [
  {
    id: '1',
    title: 'Skyfall',
    cabin_slug: 'morganton/skyfall',
    status: 'published',
    bedrooms: '4 Bedroom',
    sleeps: 8,
    today_rate: 325,
    featured_image_url: '/images/IMG_9616-HDR.jpg',
    streamline_id: 70207,
    updated_at: '2026-01-28T10:30:00Z',
  },
  {
    id: '2',
    title: 'Chase Mountain Dreams',
    cabin_slug: 'chase-mountain-dreams',
    status: 'published',
    bedrooms: '4 Bedroom',
    sleeps: 10,
    today_rate: 299,
    featured_image_url: '/images/IMG_9054-HDR-2.jpg',
    streamline_id: 70208,
    updated_at: '2026-01-27T14:15:00Z',
  },
  {
    id: '3',
    title: 'Above The Timberline',
    cabin_slug: 'blue-ridge/above-the-timberline',
    status: 'published',
    bedrooms: '4 Bedroom',
    sleeps: 8,
    today_rate: 325,
    featured_image_url: '/images/05.17.2019.02.jpg',
    streamline_id: 70209,
    updated_at: '2026-01-26T09:00:00Z',
  },
  {
    id: '4',
    title: 'Serendipity on Noontootla Creek',
    cabin_slug: 'blue-ridge/serendipity',
    status: 'draft',
    bedrooms: '3 Bedroom',
    sleeps: 6,
    today_rate: 275,
    featured_image_url: '/images/cabin-placeholder.jpg',
    streamline_id: 70210,
    updated_at: '2026-01-25T16:45:00Z',
  },
]

function StatusBadge({ status }: { status: string }) {
  const styles = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-slate-100 text-slate-700',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function CabinsListPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cabins</h1>
          <p className="text-slate-500 mt-1">Manage your cabin properties and listings</p>
        </div>
        <Link
          href="/admin/cabins/new"
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Cabin
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search cabins..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
              <option value="">All Bedrooms</option>
              <option value="2">2 Bedroom</option>
              <option value="3">3 Bedroom</option>
              <option value="4">4 Bedroom</option>
              <option value="5">5+ Bedroom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cabins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Cabin
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Bedrooms
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Sleeps
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Streamline ID
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockCabins.map((cabin) => (
                <tr key={cabin.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-slate-200 rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={cabin.featured_image_url}
                          alt={cabin.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/cabins/${cabin.id}`}
                          className="font-medium text-slate-900 hover:text-amber-600"
                        >
                          {cabin.title}
                        </Link>
                        <p className="text-sm text-slate-500">{cabin.cabin_slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={cabin.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-600">{cabin.bedrooms}</td>
                  <td className="px-6 py-4 text-slate-600">{cabin.sleeps}</td>
                  <td className="px-6 py-4 text-slate-600">
                    ${cabin.today_rate}/night
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-sm">
                    {cabin.streamline_id}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(cabin.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/cabin/${cabin.cabin_slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View on site"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/cabins/${cabin.id}/edit`}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">1-4</span> of <span className="font-medium">42</span> cabins
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">11</button>
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

