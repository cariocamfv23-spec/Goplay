import { useEffect } from 'react'
import { useScholarshipStore } from '@/stores/useScholarshipStore'
import { mockScholarships } from '@/lib/data'

export function ScholarshipAlertManager() {
  const { checkMatchAndNotify } = useScholarshipStore()

  useEffect(() => {
    // Simulate checking for new scholarships shortly after app launch
    const timer = setTimeout(() => {
      // For demonstration, we'll pick the first scholarship from our mock list
      // which happens to be "University of Florida" (Futebol), matching our mock user "Alex Silva" (Futebol)
      const newScholarship = mockScholarships[0]

      if (newScholarship) {
        checkMatchAndNotify(newScholarship)
      }
    }, 5000) // 5 seconds delay to simulate "new arrival"

    return () => clearTimeout(timer)
  }, [checkMatchAndNotify])

  return null
}
