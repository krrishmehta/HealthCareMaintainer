// apiService - the ONLY place that would talk to a real backend.
// Currently mock-only: simulates network latency and returns local data.
// Swap the body of `request()` for a real fetch() once backend/ is built.
const MOCK_DELAY_MS = 400

export function request(mockResolver, delay = MOCK_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockResolver()), delay)
  })
}
