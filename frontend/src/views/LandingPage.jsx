// Landing page - explains MediChain and routes to login/register.
import React from 'react'
import { Link } from 'react-router-dom'
import {
  QrCode,
  ShieldCheck,
  LineChart,
  ScanLine,
  Activity,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Users,
  Clock,
  HeartPulse,
  Sparkles,
  Quote
} from 'lucide-react'

import TiltCard from '../components/common/TiltCard'
import OrbitRing from '../components/common/OrbitRing'
import MedicalMascot from '../components/common/MedicalMascot'
import Reveal from '../components/common/Reveal'

const FEATURES = [
  {
    icon: QrCode,
    title: 'One QR, your whole history',
    text: 'Patients carry a single opaque QR code. It never stores medical data - just a key that unlocks records after you approve access.'
  },
  {
    icon: ShieldCheck,
    title: 'You approve every access',
    text: 'A clinician scanning your QR still needs an OTP sent to you. No OTP, no record - every time.'
  },
  {
    icon: ScanLine,
    title: 'Scan documents, skip re-typing',
    text: 'Upload a lab report or prescription photo and OCR extracts the fields for you to confirm.'
  },
  {
    icon: LineChart,
    title: 'Public health, without exposure',
    text: 'Admins see only anonymized, aggregated trends - individual records are never visible, and small groups are suppressed automatically.'
  },
]

const STATS = [
  { icon: Users, value: '12k+', label: 'Patients onboarded' },
  { icon: Clock, value: '<30s', label: 'Avg. consent time' },
  { icon: HeartPulse, value: '99.9%', label: 'Uptime this year' },
  { icon: ShieldCheck, value: 'Zero', label: 'Records exposed' },
]

const TESTIMONIALS = [
  {
    name: 'Dr. Anaya Rao',
    role: 'Family physician',
    quote: 'Scan, OTP, done. I spend the saved minutes actually talking to my patients instead of digging through paper files.',
    variant: 'shield'
  },
  {
    name: 'Marcus Webb',
    role: 'Patient, age 67',
    quote: 'I like that nothing opens without my say-so. My daughter helped me set it up once - I have used it on my own ever since.',
    variant: 'wave'
  },
  {
    name: 'Priya Nandakumar',
    role: 'Clinic administrator',
    quote: 'Onboarding our whole clinic took an afternoon. The audit trail alone has made compliance reviews painless.',
    variant: 'check'
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper page-fade overflow-x-hidden">

      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5 animate-fadeIn relative z-10">
        <div className="flex items-center gap-2">
          <Activity
            size={24}
            className="text-teal-500 transition-transform duration-500 ease-smooth hover:rotate-12"
          />
          <span className="font-semibold text-lg">MediChain</span>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-ink hover:text-teal-500 px-3 py-2 transition-colors duration-200"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="text-sm font-medium bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-md"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center">

        {/* Decorative blurred gradient blobs */}
        <div
          className="blob w-72 h-72 bg-teal-300 -top-10 -left-16 animate-float"
          style={{ animationDelay: '-1.5s' }}
          aria-hidden="true"
        />

        <div
          className="blob w-80 h-80 bg-amber-200 top-20 right-0 animate-float"
          style={{ animationDelay: '-4s' }}
          aria-hidden="true"
        />

        {/* Left Hero Content */}
        <div className="relative z-10 animate-fadeInUp">

          <p className="text-teal-500 font-medium text-sm mb-3 flex items-center gap-1.5">
            <Sparkles size={14} className="animate-pulse" />
            Consent-first medical records
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-ink">
            Your medical history,{' '}
            <span className="text-gradient">
              unlocked only when you say so
            </span>.
          </h1>

          <p className="text-slate-600 mt-5 text-lg max-w-lg">
            MediChain lets patients hold their full visit history behind one QR code and a one-time
            password. Clinicians get instant, authorized access. Admins get trends - never names.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-8">

            <Link
              to="/register"
              className="bg-teal-500 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-teal-600 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-lg group"
            >
              Create your account

              <ArrowRight
                size={18}
                className="transition-transform duration-200 ease-smooth group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="border border-slate-200 px-5 py-3 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200 ease-smooth hover:-translate-y-0.5"
            >
              I already have one
            </Link>

          </div>

        </div>

        {/* Right Hero Card */}
        <div className="relative z-10 animate-scaleIn">

          {/* Orbiting icon ring */}
          <div className="absolute -top-16 -right-10 hidden lg:block z-0">
            <OrbitRing
              icons={[
                ShieldCheck,
                QrCode,
                LineChart,
                Stethoscope
              ]}
            />
          </div>

          {/* Main Card */}
          <TiltCard className="relative z-10 bg-white border border-slate-200 rounded-lg p-8 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                <QrCode size={20} className="text-teal-500" />
              </div>

              <div>
                <p className="font-medium text-ink text-sm">
                  Scan → Consent → Record
                </p>

                <p className="text-xs text-slate-400">
                  How access works, every time
                </p>
              </div>

            </div>

            <ol className="space-y-4 stagger-children">

              {[
                'Clinician scans the patient\'s QR code',
                'Patient receives an OTP on their device',
                'Patient shares the OTP to approve access',
                'Clinician sees the record - only after that'
              ].map((step, i) => (

                <li
                  key={i}
                  className="flex items-start gap-3"
                >

                  <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>

                  <span className="text-sm text-slate-600">
                    {step}
                  </span>

                </li>

              ))}

            </ol>

          </TiltCard>

          {/* Floating proof badge */}
          <div
            className="absolute -bottom-6 -left-6 z-20 bg-white shadow-lg border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2.5 animate-float"
            style={{ animationDelay: '-2.5s' }}
          >

            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} className="text-teal-500" />
            </span>

            <div>
              <p className="text-xs font-semibold text-ink leading-none">
                Consent verified
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                via one-time password
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Heart + Heartbeat Divider */}
      <div
        className="max-w-4xl mx-auto px-6 -mt-6 mb-6 opacity-70"
        aria-hidden="true"
      >

        <div className="flex items-center gap-1">

          {/* Heart mascot at the beginning of heartbeat */}
          <div className="hidden md:flex shrink-0 items-center">
            <MedicalMascot
              variant="wave"
              size={64}
            />
          </div>

          {/* Heartbeat line */}
          <svg
            viewBox="0 0 800 60"
            width="100%"
            height="40"
            preserveAspectRatio="none"
            className="flex-1"
          >

            <polyline
              className="heartbeat-draw"
              style={{ '--line-length': 900 }}
              points="0,30 200,30 230,30 250,8 270,52 290,30 320,30 340,30 360,14 380,46 400,30 800,30"
              fill="none"
              stroke="#576855"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          </svg>

        </div>

      </div>

      {/* Stats Strip */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-4">

          {STATS.map((s, i) => (

            <div
              key={i}
              className="text-center border border-slate-200 rounded-lg py-6 px-3 bg-white card-hover"
              style={{ transitionDelay: `${i * 60}ms` }}
            >

              <s.icon
                size={20}
                className="text-teal-500 mx-auto mb-2"
              />

              <p className="text-2xl font-semibold text-ink number-pop">
                {s.value}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {s.label}
              </p>

            </div>

          ))}

        </Reveal>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <Reveal
          as="div"
          className="grid sm:grid-cols-2 gap-5 stagger-children"
        >

          {FEATURES.map((f, i) => (

            <div
              key={i}
              className="group border border-slate-200 rounded-lg p-6 bg-white card-hover"
            >

              <div className="w-11 h-11 rounded-lg bg-teal-50 flex items-center justify-center mb-3 transition-transform duration-300 ease-smooth group-hover:-rotate-6 group-hover:scale-110">
                <f.icon
                  size={20}
                  className="text-teal-500"
                />
              </div>

              <h3 className="font-semibold text-ink mb-1.5">
                {f.title}
              </h3>

              <p className="text-sm text-slate-500">
                {f.text}
              </p>

            </div>

          ))}

        </Reveal>

      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <Reveal className="text-center max-w-xl mx-auto mb-10">

          <p className="text-teal-500 font-medium text-sm mb-2">
            People behind the platform
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-ink">
            Built for patients, clinicians, and the admins who support them
          </h2>

        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 stagger-children">

          {TESTIMONIALS.map((t, i) => (

            <Reveal
              key={i}
              delay={i * 90}
              className="border border-slate-200 rounded-lg p-6 bg-white card-hover relative overflow-hidden"
            >

              <Quote
                size={28}
                className="text-teal-100 absolute top-4 right-4"
              />

              <MedicalMascot
                variant={t.variant}
                size={56}
              />

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                "{t.quote}"
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100">

                <p className="text-sm font-semibold text-ink">
                  {t.name}
                </p>

                <p className="text-xs text-slate-400">
                  {t.role}
                </p>

              </div>

            </Reveal>

          ))}

        </div>

      </section>

      {/* Closing CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <Reveal className="relative overflow-hidden rounded-2xl bg-teal-500 px-8 py-12 text-center">

          <div
            className="blob w-64 h-64 bg-white -top-20 -left-10 animate-float"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          />

          <div
            className="blob w-64 h-64 bg-white -bottom-24 -right-10 animate-float"
            style={{
              opacity: 0.12,
              animationDelay: '-3s'
            }}
            aria-hidden="true"
          />

          <h2 className="text-2xl md:text-3xl font-semibold text-white relative z-10">
            Ready to put patients back in control?
          </h2>

          <p className="text-teal-50 mt-3 max-w-md mx-auto relative z-10">
            Set up takes minutes. No card, no commitment - just a QR code and a promise that nothing opens without consent.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-teal-600 px-5 py-3 rounded-lg font-medium mt-6 relative z-10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ease-smooth group"
          >
            Create your account

            <ArrowRight
              size={18}
              className="transition-transform duration-200 ease-smooth group-hover:translate-x-1"
            />
          </Link>

        </Reveal>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        MediChain — hackathon demo. No real patient data is stored or transmitted.
      </footer>

    </div>
  )
}