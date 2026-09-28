// adminController - data-access hooks for admin views. All data returned
// here is pre-aggregated/synthetic - never patient-identifiable.
import { useState, useEffect, useMemo } from 'react'
import { DISEASE_TREND_DATA, REGIONAL_DATA, CATEGORY_BREAKDOWN } from '../services/mockData'
import { applyKThreshold } from '../utils/privacy'
import { logAction } from '../services/auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

export function useDiseaseTrends() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => setData(DISEASE_TREND_DATA), 400)
    return () => clearTimeout(t)
  }, [])
  return data
}

export function useCategoryBreakdown() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => setData(CATEGORY_BREAKDOWN), 400)
    return () => clearTimeout(t)
  }, [])
  return data
}

// Applies K=5 suppression to each region's row before the view ever sees it
export function useRegionalData(adminName, filters = {}) {
  const [raw, setRaw] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => {
      setRaw(REGIONAL_DATA)
      logAction({ actor: adminName, action: AUDIT_ACTIONS.ADMIN_QUERY, target: JSON.stringify(filters) })
    }, 400)
    return () => clearTimeout(t)
  }, [adminName, JSON.stringify(filters)])

  const protectedData = useMemo(() => {
    if (!raw) return null
    return raw.map(row => {
      const k = applyKThreshold(row.cases)
      return { ...row, suppressed: k.suppressed, cases: k.suppressed ? null : row.cases }
    })
  }, [raw])

  return protectedData
}
