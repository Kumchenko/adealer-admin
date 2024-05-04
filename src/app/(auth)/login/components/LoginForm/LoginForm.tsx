'use client'
import Api from '@/api'
import FieldInput from '@/components/Field/FieldInput'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const schema = z.object({
  login: z.string().min(3).max(20),
  password: z.string().min(5).max(64),
})

type Values = z.infer<typeof schema>

const LoginForm = () => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const handleLogin = async ({ login, password }: Values) => {
    try {
      await Api.Employee.login({ login, password })
      router.push('/dashboard')
    } catch (e) {
      toast.error(isAxiosError(e) ? e.response?.data.message ?? 'Auth error' : 'Auth error')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="login"
        render={({ field: { ref, ...props }, fieldState: { error } }) => (
          <FieldInput
            label="Username"
            id="login"
            type="text"
            placeholder="Username"
            error={error?.message}
            {...props}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...props }, fieldState: { error } }) => (
          <FieldInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            error={error?.message}
            {...props}
          />
        )}
      />

      <Button className="mx-auto" variant="success" type="submit" disabled={isSubmitting}>
        Log In
      </Button>
    </form>
  )
}

export default LoginForm
