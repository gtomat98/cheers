/* eslint-disable react/display-name */

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { DropdownMenuItem } from '../avatar/styles'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

  useForm<physicalInformationFormData>({
    resolver: zodResolver(physicalInformationFormSchema),
  })

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

export default DialogItem
