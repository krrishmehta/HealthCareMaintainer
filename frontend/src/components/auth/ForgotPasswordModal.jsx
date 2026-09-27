// Forgot-password modal - mock reset flow, no real email is sent.
import React, { useState } from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'
import { requestPasswordReset } from '../../services/authService'
import { useToast } from '../common/ToastContext'

export default function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await requestPasswordReset(email)
    setLoading(false)
    showToast(res.message, 'success')
    setEmail('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Reset your password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-slate-400">
          Enter the email linked to your account. We'll send a link to reset your password.
        </p>
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Button type="submit" className="w-full" loading={loading}>Send reset link</Button>
      </form>
    </Modal>
  )
}
