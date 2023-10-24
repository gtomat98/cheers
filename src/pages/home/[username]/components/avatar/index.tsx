import {
  AvatarFallback,
  AvatarRoot,
  AvatarImage,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuArrow,
} from './styles'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { violet, blackA } from '@radix-ui/colors'

import * as React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'

import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, CaretDown } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { Button, FormError } from '@/pages/register/styles'

import * as Select from '@radix-ui/react-select'
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
import { keyframes, styled } from '@/styles'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface AvatarTypes {
  src: string
  signOut?: () => void
}

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

export default function Avatar({ src, signOut }: AvatarTypes) {
  function releaseSignOut() {
    if (signOut) {
      signOut()
    }
  }

  const router = useRouter()

  const session = useSession()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef(null)
  const focusRef = React.useRef(null)

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current
  }

  function handleDialogItemOpenChange(open: any) {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<physicalInformationFormData>({
    resolver: zodResolver(physicalInformationFormSchema),
  })

  async function handleForm(data: physicalInformationFormData) {
    handleDialogItemOpenChange(false)
    const { age, gender, height, weight, activityFactor } = data
    try {
      await api.post('/users/physical-information', {
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

  async function handleDelete() {
    try {
      await api.post('users/update-physical-information')
      releaseSignOut()
      await router.push('')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }

  return signOut ? (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <AvatarRoot ref={dropdownTriggerRef}>
          <AvatarImage src={src} />
          <AvatarFallback delayMs={600}>US</AvatarFallback>
        </AvatarRoot>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent
          className="DropdownMenuContent"
          sideOffset={5}
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenu.Group>
            <DropdownMenuItem
              onClick={() => {
                releaseSignOut()
              }}
            >
              Sair da conta
            </DropdownMenuItem>

            <DialogItem
              triggerChildren="Editar informações"
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
            >
              <DialogTitle className="DialogTitle">
                Alterar informações
              </DialogTitle>
              <DialogDescription>
                <p>
                  Última atualização:{' '}
                  {new Date(session.data?.lastUpdate).toLocaleDateString()}
                </p>
                Edite suas informações pessoais.
              </DialogDescription>
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

                    {errors.weight && (
                      <FormError>{errors.weight.message}</FormError>
                    )}
                  </label>

                  <label>
                    <span>Sua altura</span>
                    <input
                      type="number"
                      placeholder="em CM"
                      defaultValue={session.data?.token.height}
                      min={120}
                      {...register('height')}
                    />

                    {errors.height && (
                      <FormError>{errors.height.message}</FormError>
                    )}
                  </label>

                  <label>
                    <span>Sua idade</span>
                    <input
                      type="number"
                      placeholder="00"
                      min={15}
                      {...register('age')}
                      value={session.data?.token.age}
                      readOnly
                    />

                    {errors.age && <FormError>{errors.age.message}</FormError>}
                  </label>
                </InputsContainer>

                <Controller
                  control={control}
                  name="gender"
                  defaultValue={session.data?.token.gender}
                  render={({ field }) => {
                    return (
                      <GenderTypeContainer>
                        <span>Sexo</span>
                        <GenderType
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <GenderTypeButton value="male">
                            Masculino
                          </GenderTypeButton>
                          <GenderTypeButton value="female">
                            Feminino
                          </GenderTypeButton>
                        </GenderType>
                      </GenderTypeContainer>
                    )
                  }}
                />

                <Controller
                  control={control}
                  name="activityFactor"
                  defaultValue={session.data?.token.activityFactor}
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
                                  <ActivityFactorItemText>
                                    Leve
                                  </ActivityFactorItemText>
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
            </DialogItem>

            <DialogItemDelete
              triggerChildren="Apagar conta"
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
            >
              <DialogTitle className="DialogTitle">Apagar conta</DialogTitle>
              <DialogDescription>
                Tem certeza de que deseja apagar sua conta?
              </DialogDescription>
              <DeleteButton onClick={handleDelete}>Apagar</DeleteButton>
            </DialogItemDelete>
          </DropdownMenu.Group>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  ) : (
    <AvatarRoot>
      <AvatarImage src={src} />
      <AvatarFallback delayMs={600}>US</AvatarFallback>
    </AvatarRoot>
  )
}

// eslint-disable-next-line react/display-name
const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props
  const session = useSession()
  const actualDate = new Date()
  const pastDate = new Date(actualDate)
  pastDate.setDate(actualDate.getDate() - 15)
  const formattedDate = pastDate.toISOString()
  const itsUpdatable =
    session.data!.lastUpdate !== null
      ? session.data!.lastUpdate < formattedDate
      : true

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenuItem
          disabled={!itsUpdatable || session.data?.token.role !== 'user'}
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
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <IconButton className="IconButton" aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

// eslint-disable-next-line react/display-name
const DialogItemDelete = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
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
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <IconButton className="IconButton" aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

const Form = styled('form', {
  zIndex: 1000000000000000000000000000000000000000000000000,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const DeleteButton = styled('button', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: 12,
  borderRadius: 4,
  color: '$textTitle',
  padding: '12px 0px',
  background: '$red',
  fontSize: 14,
  cursor: 'pointer',
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  background:
    'linear-gradient(19deg, rgba(14,12,31 ,1), rgba(49, 43, 93, 0.8))',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 24,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$textTitle',
  fontSize: 17,
})

const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: '$text',
  fontSize: 15,
  lineHeight: 1.5,
})

const IconButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: violet.violet4 },
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
})
