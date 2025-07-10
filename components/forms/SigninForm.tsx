'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/slices/authSlice'
import InputField from '@/components/ui/InputField/InputField'
import { Phone, Lock, Loader } from 'lucide-react'
import { Button } from '../ui/Button/Button'

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .refine((email) => email.endsWith('@gmail.com'), {
      message: 'Email must be a Gmail address',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

const SigninForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        Cookies.set('user', JSON.stringify({ email: data.email, role: result.role }), { expires: 7 })
        dispatch(setUser({ email: data.email, role: result.role }))

        if (result.role === 'User') {
          router.push('/dashboard/wallet')
        } else if (result.role === 'Admin') {
          router.push('/dashboard/users')
        } else if (result.role === 'Super_Admin') {
          router.push('/dashboard/admins')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center max-w-96 gap-6 w-full px-4">
        <InputField
          label={'Email'}
          type="email"
          {...register("email")}
          icon={<Phone size={16} />}
          placeholder="example@gmail.com"
          error={errors.email?.message}
        />
        <InputField
          label={"Password"}
          type="password"
          {...register("password")}
          icon={<Lock size={16} />}
          placeholder="Enter your password"
          error={errors.password?.message}
        />
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (
            <Loader className="animate-spin w-4 h-4 mr-2" />
          ) : (
            'Sign In'
          )}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}

export default SigninForm
