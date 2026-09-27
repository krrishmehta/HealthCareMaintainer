// Login page - single form, role is inferred from account (no role picker
// needed to log in; register requires a role since admin can't self-serve).
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Activity, ShieldCheck, QrCode, LineChart, Lock, Stethoscope } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import TiltCard from '../components/common/TiltCard'
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal'
import MedicalMascot from '../components/common/MedicalMascot'
import { useAuth } from '../controllers/authController.jsx'
import { useToast } from '../components/common/ToastContext'
import { ROLES } from '../utils/constants'

// Each role's default landing page after login (admin's index route is
// "overview", not "dashboard" - keep this in sync with routes/AppRoutes.jsx)
const DEFAULT_ROUTE = {
  [ROLES.PATIENT]: '/patient/dashboard',
  [ROLES.CLINICIAN]: '/clinician/dashboard',
  [ROLES.ADMIN]: '/admin/overview',
}

const DEMO_ACCOUNTS = [
  { label: 'Patient demo', email: 'patient@demo.com', password: 'patient123' },
  { label: 'Clinician demo', email: 'clinician@demo.com', password: 'clinician123' },
  { label: 'Admin demo', email: 'admin@demo.com', password: 'admin123' },
]

const SIDE_CHIPS = [
  { icon: ShieldCheck, top: '10%', left: '14%', delay: '0s' },
  { icon: QrCode, top: '62%', left: '8%', delay: '-1.2s' },
  { icon: LineChart, top: '20%', left: '78%', delay: '-2.1s' },
  { icon: Stethoscope, top: '72%', left: '76%', delay: '-0.6s' },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.success) {
      setError(res.error)
      return
    }
    showToast(`Welcome back, ${res.user.name.split(' ')[0]}!`, 'success')
    const cameFrom = location.state?.from
const from = (cameFrom && cameFrom.startsWith(`/${res.user.role}`)) ? cameFrom : DEFAULT_ROUTE[res.user.role]
navigate(from, { replace: true })
  }

  function fillDemo(acc) {
    setEmail(acc.email)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="relative min-h-screen bg-paper page-fade overflow-hidden grid lg:grid-cols-2">
      {/* ---------- Illustrated side panel (hidden on small screens) ---------- */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-teal-500">
        <div className="gradient-mesh absolute -top-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-sage-400 blur-3xl opacity-50" aria-hidden="true" />
        <div className="gradient-mesh absolute -bottom-40 -right-16 w-[28rem] h-[28rem] rounded-full bg-amber-400 blur-3xl opacity-30" style={{ animationDelay: '-6s' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-dot-grid" style={{ filter: 'invert(1)', opacity: 0.06 }} aria-hidden="true" />

        {SIDE_CHIPS.map((c, i) => (
          <div
            key={i}
            className="chip-bob absolute w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            style={{ top: c.top, left: c.left, animationDelay: c.delay, '--chip-rot': `${(i % 2 ? -1 : 1) * 6}deg` }}
            aria-hidden="true"
          >
            <c.icon size={20} className="text-white" />
          </div>
        ))}

        <div className="relative z-10 text-center px-10 max-w-sm animate-fadeInUp">
          <MedicalMascot variant="shield" size={140} className="mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white leading-snug">Welcome back to a record that only opens for you</h2>
          <p className="text-teal-50/90 text-sm mt-3">Every login keeps your consent-first history exactly where you left it - nowhere else.</p>
          <div className="flex items-center justify-center gap-2 mt-6 text-teal-50/80 text-xs">
            <Lock size={14} /> Encrypted end-to-end, always
          </div>
        </div>
      </div>

      {/* ---------- Form panel ---------- */}
      <div className="relative flex items-center justify-center px-4 py-10">
        <div className="blob w-72 h-72 bg-teal-300 -top-16 -left-20 animate-float lg:hidden" style={{ animationDelay: '-1s' }} aria-hidden="true" />
        <div className="blob w-72 h-72 bg-amber-200 -bottom-16 -right-16 animate-float lg:hidden" style={{ animationDelay: '-3.5s' }} aria-hidden="true" />

        <div className="relative z-10 w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 animate-fadeIn">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-teal-500 pulse-glow">
              <Activity size={18} className="text-white" />
            </span>
            <span className="font-semibold text-lg">MediChain</span>
          </Link>

          <div className="animate-scaleIn">
            <TiltCard intensity={5} className="bg-white border border-slate-200 rounded-lg p-7 shadow-sm">
              <h2 className="font-semibold text-xl text-ink mb-1">Log in</h2>
              <p className="text-sm text-slate-400 mb-6">Access your patient, clinician, or admin dashboard.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                {error && <p className="text-sm text-danger animate-fadeInUp">{error}</p>}
                <div className="flex justify-end">
                  <button type="button" onClick={() => setForgotOpen(true)} className="text-sm text-teal-500 hover:underline transition-colors duration-200">
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full" loading={loading}>Log in</Button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-2">Quick demo access</p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_ACCOUNTS.map(acc => (
                    <button key={acc.email} onClick={() => fillDemo(acc)} className="text-xs px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all duration-200 ease-smooth hover:-translate-y-0.5">
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-400 mt-6 text-center">
                New here? <Link to="/register" className="text-teal-500 font-medium hover:underline transition-colors duration-200">Create an account</Link>
              </p>
            </TiltCard>
          </div>
        </div>
      </div>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </div>
  )
}
