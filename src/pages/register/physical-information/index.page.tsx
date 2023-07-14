import * as Select from '@radix-ui/react-select'

import { Container, Header, Button, FormError } from '../styles'
import { MultiStep } from '@ignite-ui/react'
import { ArrowRight, CaretDown } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import {
  Form,
  ActivityFactorContent,
  ActivityFactorItem,
  ActivityFactorItemText,
  ActivityFactorRoot,
  ActivityFactorSelect,
  ActivityFactorTypeContainer,
  GenderType,
  GenderTypeButton,
  GenderTypeContainer,
  InputsContainer,
} from './styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const physicalInformationFormSchema = z.object({
  weight: z
    .string()
    .transform((weight) => parseInt(weight))
    .refine((weight) => weight > 20, { message: 'O peso mínimo é de 20KG' })
    .refine((weight) => weight < 160, { message: 'O peso máximo é de 160KG' }),

  height: z
    .string()
    .transform((weight) => parseInt(weight))
    .refine((weight) => weight > 120, { message: 'Altura mínima de 120CM' })
    .refine((weight) => weight < 250, { message: 'Altura máxima de 250CM' }),
  age: z
    .string()
    .transform((weight) => parseInt(weight))
    .refine((weight) => weight > 15, { message: 'Idade mínima de 15 anos' })
    .refine((weight) => weight < 80, { message: 'Idade máxima de 80 anos' }),
  gender: z.enum(['male', 'female']),
  activityFactor: z.enum(['sedentary', 'light', 'moderate', 'high']),
})

type physicalInformationFormData = z.infer<typeof physicalInformationFormSchema>

export default function ConnectGoogle() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<physicalInformationFormData>({
    resolver: zodResolver(physicalInformationFormSchema),
  })

  const router = useRouter()
  const session = useSession()

  async function handleForm(data: physicalInformationFormData) {
    const { age, gender, height, weight, activityFactor } = data
    try {
      await api.post('/users/physical-information', {
        age,
        height,
        weight,
        activityFactor,
        gender,
      })

      await router.push(`/${session.data?.user.username}`)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Quais são suas características físicas?</strong>
        <p>
          Saber mais sobre suas individualidades físicas é importantíssimo para
          calcularmos suas calorias e macronutrientes!
        </p>
      </Header>

      <MultiStep size={3} currentStep={3} />
      <Form onSubmit={handleSubmit(handleForm)}>
        <InputsContainer>
          <label>
            <span>Seu peso</span>
            <input
              type="number"
              placeholder="em KG"
              min={20}
              {...register('weight')}
            />

            {errors.weight && <FormError>{errors.weight.message}</FormError>}
          </label>

          <label>
            <span>Sua altura</span>
            <input
              type="number"
              placeholder="em CM"
              min={120}
              {...register('height')}
            />

            {errors.height && <FormError>{errors.height.message}</FormError>}
          </label>

          <label>
            <span>Sua idade</span>
            <input
              type="number"
              placeholder="00"
              min={15}
              {...register('age')}
            />

            {errors.age && <FormError>{errors.age.message}</FormError>}
          </label>
        </InputsContainer>

        <Controller
          control={control}
          name="gender"
          render={({ field }) => {
            return (
              <GenderTypeContainer>
                <span>Sexo</span>
                <GenderType onValueChange={field.onChange} value={field.value}>
                  <GenderTypeButton value="male">Masculino</GenderTypeButton>
                  <GenderTypeButton value="female">Feminino</GenderTypeButton>
                </GenderType>
              </GenderTypeContainer>
            )
          }}
        />

        <Controller
          control={control}
          name="activityFactor"
          render={({ field }) => {
            return (
              <ActivityFactorTypeContainer>
                <span>
                  Como você classifica as suas atividades do dia a dia?
                </span>
                <ActivityFactorRoot
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <ActivityFactorSelect>
                    <Select.Value placeholder="Selecione..." />
                    <Select.Icon>
                      <CaretDown size={16} />
                    </Select.Icon>
                  </ActivityFactorSelect>

                  <Select.Portal>
                    <ActivityFactorContent>
                      <Select.Viewport style={{ padding: '5px' }}>
                        <ActivityFactorItem value="sedentary">
                          <ActivityFactorItemText>
                            Sedentário
                          </ActivityFactorItemText>
                        </ActivityFactorItem>
                        <ActivityFactorItem value="light">
                          <ActivityFactorItemText>Leve</ActivityFactorItemText>
                        </ActivityFactorItem>
                        <ActivityFactorItem value="moderate">
                          <ActivityFactorItemText>
                            Moderado
                          </ActivityFactorItemText>
                        </ActivityFactorItem>
                        <ActivityFactorItem value="high">
                          <ActivityFactorItemText>
                            Intenso
                          </ActivityFactorItemText>
                        </ActivityFactorItem>
                      </Select.Viewport>
                    </ActivityFactorContent>
                  </Select.Portal>
                </ActivityFactorRoot>
              </ActivityFactorTypeContainer>
            )
          }}
        />

        <Button type="submit" disabled={isSubmitting || !isValid}>
          Concluir
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
