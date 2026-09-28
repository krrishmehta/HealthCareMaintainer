// AI Trend Summary - admin-only narration of pre-aggregated numbers.
// The AI service never touches auth, OTP, privacy suppression, or
// individual clinical decisions - it only summarizes what's already computed.
import React, { useState } from 'react'
import { Sparkles, RefreshCcw } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { generateTrendSummary } from '../../services/aiService'
import { useAuth } from '../../controllers/authController.jsx'

export default function AITrendSummary() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    const res = await generateTrendSummary(user.name, { scope: 'all-regions' })
    setLoading(false)
    if (res.success) setSummary(res)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink flex items-center gap-2"><Sparkles size={20} className="text-teal-500" /> AI Trend Summary</h2>
        <p className="text-slate-400 text-sm mt-1">Generated only from anonymized, aggregate data — never individual records.</p>
      </div>

      <Card>
        {loading && <LoadingSpinner label="Analyzing aggregate trends…" />}
        {!loading && !summary && (
          <div className="text-center py-6">
            <p className="text-sm text-slate-400 mb-4">No summary generated yet this session.</p>
            <Button onClick={generate}>Generate summary</Button>
          </div>
        )}
        {!loading && summary && (
          <div>
            <p className="text-ink leading-relaxed">{summary.summary}</p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Generated just now · based on current aggregate dataset</p>
              <Button variant="secondary" onClick={generate}><RefreshCcw size={14} /> Regenerate</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
