// Register page - patient or clinician/clinic only. Admin has no registration path.
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, User, Stethoscope, ScanLine, ShieldCheck, HeartPulse, Lock } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import TiltCard from '../components/common/TiltCard'
import MedicalMascot from '../components/common/MedicalMascot'
import { useAuth } from '../controllers/authController.jsx'
import { useToast } from '../components/common/ToastContext'
import { ROLES } from '../utils/constants'

const SIDE_CHIPS = [
  { icon: ScanLine, top: '14%', left: '18%', delay: '-0.4s' },
  { icon: HeartPulse, top: '66%', left: '12%', delay: '-2.4s' },
  { icon: ShieldCheck, top: '18%', left: '74%', delay: '-1.6s' },
  { icon: Stethoscope, top: '70%', left: '78%', delay: '-3s' },
]

export default function RegisterPage() {
  const [role, setRole] = useState(ROLES.PATIENT)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', clinicName: '',  registerNumber: ''})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (form.password.length < 6) e.password = 'Minimum 6 characters.'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    if (role === ROLES.CLINICIAN) {
  if (!form.clinicName.trim()) {
    e.clinicName = 'Clinic name is required.'
  }

  if (!form.registerNumber.trim()) {
    e.registerNumber = 'Register number is required.'
  }
}
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length) return
    setLoading(true)
    const res = await register({ name: form.name, email: form.email, password: form.password, role, clinicName: form.clinicName })
    setLoading(false)
    if (!res.success) {
      setErrors({ form: res.error })
      return
    }
    showToast('Account created — welcome to MediChain!', 'success')
    navigate(`/${role}/dashboard`, { replace: true })
  }

  return (
    <div className="relative min-h-screen bg-paper page-fade overflow-hidden grid lg:grid-cols-2">
      {/* ---------- Form panel (comes first on mobile) ---------- */}
      <div className="relative flex items-center justify-center px-4 py-10 order-2 lg:order-1">
        <div className="blob w-72 h-72 bg-sage-300 -top-16 -right-20 animate-float lg:hidden" style={{ animationDelay: '-2s' }} aria-hidden="true" />
        <div className="blob w-72 h-72 bg-teal-200 -bottom-16 -left-16 animate-float lg:hidden" style={{ animationDelay: '-4.5s' }} aria-hidden="true" />

        <div className="relative z-10 w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 animate-fadeIn">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-teal-500 pulse-glow">
              <Activity size={18} className="text-white" />
            </span>
            <span className="font-semibold text-lg">MediChain</span>
          </Link>

          <div className="animate-scaleIn">
            <TiltCard intensity={5} className="bg-white border border-slate-200 rounded-lg p-7 shadow-sm">
              <h2 className="font-semibold text-xl text-ink mb-1">Create your account</h2>
              <p className="text-sm text-slate-400 mb-5">Admin accounts are provisioned internally and can't be created here.</p>

              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setRole(ROLES.PATIENT)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ease-smooth ${role === ROLES.PATIENT ? 'border-teal-500 bg-teal-50 text-teal-600 scale-[1.02]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <User size={16} /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole(ROLES.CLINICIAN)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ease-smooth ${role === ROLES.CLINICIAN ? 'border-teal-500 bg-teal-50 text-teal-600 scale-[1.02]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <Stethoscope size={16} /> Clinician / Clinic
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
                {role === ROLES.CLINICIAN && (
                  <>
                  <div className="animate-fadeInUp">
                    <Input label="Clinic name" value={form.clinicName} onChange={(e) => update('clinicName', e.target.value)} error={errors.clinicName} placeholder="e.g. LinkCode Family Clinic" />
                  </div>
                  
                 <Input
                 label="Clinic Registration Number"
                 value={form.registerNumber}
                onChange={(e) => update('registerNumber', e.target.value)}
                error={errors.registerNumber}
                placeholder="e.g. REG-123456"
               />
  
               </>
                )}
                <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
                <Input label="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} error={errors.password} />
                <Input label="Confirm password" type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} error={errors.confirm} />
                {errors.form && <p className="text-sm text-danger animate-fadeInUp">{errors.form}</p>}
                <Button type="submit" className="w-full" loading={loading}>Create account</Button>
              </form>

              <p className="text-sm text-slate-400 mt-6 text-center">
                Already have an account? <Link to="/login" className="text-teal-500 font-medium hover:underline transition-colors duration-200">Log in</Link>
              </p>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* ---------- Illustrated side panel (hidden on small screens) ---------- */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-teal-500 order-1 lg:order-2">
        <div className="gradient-mesh absolute -top-28 -right-20 w-[26rem] h-[26rem] rounded-full bg-amber-400 blur-3xl opacity-30" aria-hidden="true" />
        <div className="gradient-mesh absolute -bottom-40 -left-16 w-[28rem] h-[28rem] rounded-full bg-sage-400 blur-3xl opacity-50" style={{ animationDelay: '-6s' }} aria-hidden="true" />
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
          <MedicalMascot variant="check" size={140} className="mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white leading-snug">Set up once, stay in control forever</h2>
          <p className="text-teal-50/90 text-sm mt-3">Patients and clinics both start here - your role decides what you see next, nothing more.</p>
          <div className="flex items-center justify-center gap-2 mt-6 text-teal-50/80 text-xs">
            <Lock size={14} /> Your data, your consent, every time
          </div>
        </div>
      </div>
    </div>
  )
}
