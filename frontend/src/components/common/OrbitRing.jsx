// OrbitRing - purely decorative: a set of icon chips orbiting a glowing
// center mark. Pure CSS animation (no dependencies) - each chip is placed
// at a fixed angle on the ring, the ring itself spins, and each chip
// counter-spins at the same rate so the icon glyph stays upright.
import React from 'react'
import { Activity } from 'lucide-react'

export default function OrbitRing({ icons = [], radius = 92, size = 224, centerColor = 'bg-teal-500' }) {
  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 orbit-ring">
        {icons.map((Icon, i) => {
          const angle = (360 / icons.length) * i
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -ml-5 -mt-5 w-10 h-10"
              style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}
            >
              <div className="orbit-ring-reverse w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center">
                <Icon size={17} className="text-teal-500" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-14 h-14 rounded-full ${centerColor} flex items-center justify-center shadow-lg pulse-glow`}>
          <Activity size={22} className="text-white" />
        </div>
      </div>
    </div>
  )
}
