import { physicalInformationFormData } from '@/pages/api/users/physical-information.api'

export function getBasalMetabolismRate({
  gender,
  age,
  height,
  weight,
  activityFactor,
}: physicalInformationFormData): number {
  const basalEnergyExpenditureVariantsByGender = {
    male() {
      // eslint-disable-next-line prettier/prettier
      const basalMetabolicRate = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
      return basalMetabolicRate
    },
    female() {
      // eslint-disable-next-line prettier/prettier
      const basalMetabolicRate = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
      return basalMetabolicRate
    },
  }

  const activityFactorVariantValues = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
  }

  const release = basalEnergyExpenditureVariantsByGender[gender]

  const basalMetabolicRate = release()
  const TotalEnergyExpenditure =
    basalMetabolicRate * activityFactorVariantValues[activityFactor]

  return TotalEnergyExpenditure
}
