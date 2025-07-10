'use client'
import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const user = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (pathname === '/dashboard' && user.role) {
      if (user.role === 'User') {
        router.replace('/dashboard/wallet')
      } else if (user.role === 'Admin') {
        router.replace('/dashboard/users')
      } else if (user.role === 'Super_Admin') {
        router.replace('/dashboard/admins')
      }
    }
  }, [pathname, user.role, router])

  return null
}
