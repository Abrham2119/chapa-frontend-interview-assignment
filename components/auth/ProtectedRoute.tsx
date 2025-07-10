'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const cookie = Cookies.get('user')
    if (!cookie) {
      router.replace('/')
    } else {
      setIsAllowed(true)
    }
  }, [router])

  if (!isAllowed) {
    return null
  }

  return <>{children}</>
}
