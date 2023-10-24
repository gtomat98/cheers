/* eslint-disable react/display-name */

import * as Select from '@radix-ui/react-select'
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ArrowRight, CaretDown } from 'phosphor-react'

import { violet, blackA, mauve } from '@radix-ui/colors'
import { DropdownMenuItem } from '../avatar/styles'
import { styled, keyframes } from '@/styles'
import {
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
} from '@/pages/register/physical-information/styles'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { Button, FormError } from '@/pages/register/styles'
import { useRouter } from 'next/router'
import { InputContainer } from '@/pages/adm/dashboard/styles'

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

const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<physicalInformationFormData>({
    resolver: zodResolver(physicalInformationFormSchema),
  })

  async function handleForm(data: physicalInformationFormData) {
    const { age, gender, height, weight, activityFactor } = data
    try {
      await api.post('/users/update-physical-information', {
        age,
        height,
        weight,
        activityFactor,
        gender,
      })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <div>
            <h2>Dialog</h2>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

const Form = styled('form', {
  borderRadius: 6,

  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export default DialogItem
