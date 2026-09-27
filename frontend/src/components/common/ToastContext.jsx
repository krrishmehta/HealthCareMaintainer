// Toast notification system - simple context + fixed-position stack.
import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = { success: CheckCircle2, error: XCircle, info: Info }
const COLORS = { success: 'bg-teal-500', error: 'bg-danger', info: 'bg-slate-600' }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(t => {
          const Icon = ICONS[t.type] || Info
          return (
            <div key={t.id} className={`${COLORS[t.type]} text-white rounded-lg shadow-lg px-4 py-3 flex items-start gap-2 animate-slideInRight`}>
              <Icon size={18} className="mt-0.5 shrink-0 animate-scaleIn" />
              <span className="text-sm">{t.message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
