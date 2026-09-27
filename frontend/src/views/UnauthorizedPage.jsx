import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-center px-4">
      <ShieldAlert size={40} className="text-danger mb-4" />
      <h1 className="text-2xl font-semibold text-ink">403 — Access denied</h1>
      <p className="text-slate-400 mt-2 max-w-sm">Your account role doesn't have permission to view this page.</p>
      <Link to="/login" className="mt-6 text-teal-500 font-medium hover:underline">Back to login</Link>
    </div>
  )
}
