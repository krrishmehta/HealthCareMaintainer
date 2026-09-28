// TiltCard - wraps any content in a subtle, mouse-tracking 3D tilt.
// Pure CSS transforms driven by a ref (no re-renders, no dependencies),
// so it stays smooth and safe to drop around any card-like block.
import React, { useRef } from 'react'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * intensity * 2
    const rotateX = -(py - 0.5) * intensity * 2
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015,1.015,1.015)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div className="tilt-wrap">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`tilt-card ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
