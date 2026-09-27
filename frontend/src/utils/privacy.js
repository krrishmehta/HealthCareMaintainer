import { K_THRESHOLD } from './constants'

// Enforce the k-anonymity threshold on any aggregate count.
// Returns { suppressed: true } if the group is too small to display safely,
// otherwise returns the value untouched. Used everywhere admin charts read data.
export function applyKThreshold(count) {
  if (count < K_THRESHOLD) {
    return { suppressed: true, value: null }
  }
  return { suppressed: false, value: count }
}

export const SUPPRESSED_MESSAGE = '🔒 Data Suppressed — group size is below the privacy threshold.'
