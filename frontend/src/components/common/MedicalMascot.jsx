// MedicalMascot - a friendly, brand-colored illustrated character used across
// the landing, login and register pages. Deliberately abstract (a rounded
// "heart guardian" shape rather than a human figure) so it reads as warm and
// approachable for every age group without looking childish or informal.
// Pure inline SVG + CSS animation - no image assets, no dependencies.
import React from 'react'

const VARIANTS = {
  wave: { armRotate: true, accessory: 'stethoscope' },
  shield: { armRotate: false, accessory: 'shield' },
  check: { armRotate: true, accessory: 'clipboard' },
}

export default function MedicalMascot({ variant = 'wave', size = 220, className = '' }) {
  const cfg = VARIANTS[variant] || VARIANTS.wave

  return (
    <div className={`mascot-bob ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 220 220" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mascotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B8972" />
            <stop offset="100%" stopColor="#576855" />
          </linearGradient>
        </defs>

        {/* soft shadow */}
        <ellipse cx="110" cy="196" rx="52" ry="9" fill="#252B21" opacity="0.08" />

        {/* heart-shaped body */}
        <path
          d="M110 172
             C 58 138, 30 104, 30 72
             C 30 44, 52 26, 76 26
             C 92 26, 104 34, 110 46
             C 116 34, 128 26, 144 26
             C 168 26, 190 44, 190 72
             C 190 104, 162 138, 110 172 Z"
          fill="url(#mascotBody)"
        />

        {/* soft highlight */}
        <path d="M62 54 C 58 68, 62 84, 74 96" stroke="#F2F3F1" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.35" />

        {/* face */}
        <g>
          <rect className="mascot-eye" x="80" y="78" width="10" height="14" rx="5" fill="#F8F7F1" />
          <rect className="mascot-eye delay" x="126" y="78" width="10" height="14" rx="5" fill="#F8F7F1" />
          <path d="M92 104 Q110 118 128 104" stroke="#F8F7F1" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="70" cy="98" rx="7" ry="4.5" fill="#F8F7F1" opacity="0.35" />
          <ellipse cx="150" cy="98" rx="7" ry="4.5" fill="#F8F7F1" opacity="0.35" />
        </g>

        {/* waving arm */}
        <g className={cfg.armRotate ? 'mascot-wave' : ''} style={{ transformBox: 'fill-box' }}>
          <circle cx="182" cy="86" r="11" fill="#928D79" />
        </g>
        <circle cx="40" cy="90" r="11" fill="#928D79" />

        {/* accessory */}
        {cfg.accessory === 'stethoscope' && (
          <path
            d="M92 132 C 92 148, 128 148, 128 132"
            stroke="#F3F1E5"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        )}
        {cfg.accessory === 'shield' && (
          <path
            d="M110 126 L124 132 V148 C124 158, 117 165, 110 168 C103 165, 96 158, 96 148 V132 Z"
            fill="#F3F1E5"
            opacity="0.9"
          />
        )}
        {cfg.accessory === 'clipboard' && (
          <g opacity="0.9">
            <rect x="98" y="128" width="24" height="28" rx="3" fill="#F3F1E5" />
            <path d="M104 138 L109 143 L118 133" stroke="#576855" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        )}
      </svg>
    </div>
  )
}
