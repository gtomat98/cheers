import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Container, Form, FormAnnotation, Input } from './styles'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleClaimUsername)}>
        <Input type="text" placeholder="username" {...register('username')} />

        <Button type="submit" disabled={isSubmitting}>
          Entrar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <p>
          {errors.username
            ? errors.username?.message
            : 'Digite o nome do usuário desejado'}
        </p>
        <Link href={'/login'}>
          <span>Já possui uma conta?</span>
        </Link>
      </FormAnnotation>
    </Container>
  )
}
