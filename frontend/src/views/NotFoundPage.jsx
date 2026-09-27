import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-center px-4">
      <Compass size={40} className="text-slate-300 mb-4" />
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <p className="text-slate-400 mt-2 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-6 text-teal-500 font-medium hover:underline">Back to home</Link>
    </div>
  )
}
