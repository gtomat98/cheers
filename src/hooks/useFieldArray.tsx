import {
  AddFoodButton,
  AppendSection,
  ItemInput,
  MealItem,
  QtdInput,
  RemoveFoodButton,
} from '@/pages/adm/[user]/styles'
import { PlusCircle, Trash } from 'phosphor-react'
import { useFieldArray } from 'react-hook-form'

export function FieldsForFoods(
  index: number,
  weekday: number,
  control: any,
  register: any,
) {
  const { fields, append, remove } = useFieldArray({
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
              />
              <QtdInput
                placeholder="gr.."
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
