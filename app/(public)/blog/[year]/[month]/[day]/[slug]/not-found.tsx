import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The blog post you are looking for could not be found. It may have been removed or the URL may be incorrect.
        </p>
        <div className="space-x-4">
          <Link 
            href="/blogs" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Blog Posts
          </Link>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

