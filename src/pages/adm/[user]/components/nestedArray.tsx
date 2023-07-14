/* eslint-disable import/no-anonymous-default-export */
import { useFieldArray } from 'react-hook-form'
import {
  AddFoodButton,
  AppendSection,
  ItemInput,
  MealItem,
  QtdInput,
  RemoveFoodButton,
} from '../styles'
import { PlusCircle, Trash } from 'phosphor-react'

export default function NestedArray({
  control,
  register,
  weekday,
  index,
}: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `data.${weekday}.meals.${index}.foods`,
  })

  return (
    <>
      {fields.map((item, foodIndex) => {
        return (
          <MealItem key={item.id}>
            <div>
              <ItemInput
                type="text"
                placeholder="Alimento.."
                {...register(
                  `data.${weekday}.meals.${index}.foods.${foodIndex}.food` as const,
                )}
                defaultValue={item.food}
              />
              <QtdInput
                placeholder="gr.."
                defaultValue={item.quantity}
                {...register(
                  `data.${weekday}.meals.${index}.foods.${foodIndex}.quantity` as const,
                )}
              />
            </div>

            <RemoveFoodButton
              type="button"
              onClick={() => remove(foodIndex)}
              disabled={fields.length < 2}
            >
              <Trash size={18} weight="bold" />
            </RemoveFoodButton>
          </MealItem>
        )
      })}

      <AppendSection>
        <AddFoodButton
          type="button"
          onClick={() => {
            append({ food: '', quantity: '' })
          }}
          disabled={fields.length > 4}
        >
          <PlusCircle size={24} weight="regular" />
        </AddFoodButton>
      </AppendSection>
    </>
  )
}
