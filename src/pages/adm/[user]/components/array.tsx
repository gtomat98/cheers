import { useFieldArray } from 'react-hook-form'
import { MealContainer } from '../styles'
import NestedArray from './nestedArray'

export const meals = {
  breakfast: 'Café da manhã',
  lunch: 'Almoço',
  snack: 'Café da tarde',
  dinner: 'Janta',
  supper: 'Ceia',
}

export default function FieldArray({ control, register, weekday }) {
  const { fields } = useFieldArray({
    control,
    name: `data.${weekday}.meals`,
  })

  return (
    <>
      {fields.map((field, index) => {
        return (
          <MealContainer key={field.id}>
            <header>
              <h3>{meals[field.meal]}</h3>
            </header>
            <NestedArray
              control={control}
              register={register}
              weekday={weekday}
              index={index}
            />
            {/* {FieldsForFoods(index, weekday, register, control)} */}
          </MealContainer>
        )
      })}
    </>
  )
}
